import express from 'express';

app.post("/api/v1/courses", validator(schemaPost), (req, res) => {
    const course = service.addCourse(req.body);
    res.status(201).send(course);
});

app.get("/api/v1/courses/:id", (req, res) => {
    const id = req.params.id
    res.send(service.getCourse(id));
});

app.delete("/api/v1/courses/:id", valid, (req, res) => {
    const course = service.removeCourse(req.params.id);
    res.send(course);
});

app.put("/api/v1/courses/:id", valid, (req, res) => {
    
    const course = service.updateCourse(req.params.id, req.body);
    res.send(course);
});

app.get("/api/v1/courses", (req, res) => {
    res.send(service.findCourses(req.query));
});
