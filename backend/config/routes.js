module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)

    app.route('/projects')
        .post(app.api.project.save)
        .get(app.api.project.get)

    app.route('/projects/:id')
        .get(app.api.project.getById)
        .put(app.api.project.get)
        .delete(app.api.project.remove)
}