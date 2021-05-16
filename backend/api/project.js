module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const project = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }
        
        if(req.params.id) project.id = req.params.id

        try {
            existsOrError(project.name, 'Nome não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(project.id) {
            app.db('projects')
                .update(project)
                .where({ id: project.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('projects')
                .insert(project)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Projeto não informado.')

            const subproject = await app.db('projects')
                .where({ parentId: req.params.id })
            notExistsOrError(subproject, 'Projeto possui subProjetos.')

            const articles = await app.db('articles')
                .where({ projectId: req.params.id })
            notExistsOrError(articles, 'Projeto possui artigos.')

            const rowsDeleted = await app.db('projects')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Projeto não foi encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = projects => {
        const getParent = (projects, parentId) => {
            const parent = projects.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const projectsWithPath = projects.map(project => {
            let path = project.name
            let parent = getParent(projects, project.parentId)

            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(projects, parent.parentId)
            }

            return { ...project, path }
        })

        projectsWithPath.sort((a, b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return projectsWithPath
    }

    const get = (req, res) => {
        app.db('projects')
            .then(projects => res.json(withPath(projects)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('projects')
            .where({ id: req.params.id })
            .first()
            .then(project => res.json(project))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }
}