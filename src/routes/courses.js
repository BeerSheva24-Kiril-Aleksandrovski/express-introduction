import express from 'express'
import { valid, validator, expressValidator } from '../middleware/validation.js';
import { schemaPost, schemaPut } from '../validation/schemas.js';
import service from '../service/CoursesService.js';
import { auth } from '../middleware/auth.js';
import coursesPaths from '../paths/coursesPaths.js';

const coursesRoute = express.Router();

coursesRoute.use(auth(coursesPaths))

coursesRoute.use(expressValidator({ POST: schemaPost, PUT: schemaPut }));

coursesRoute.post("/", validator(schemaPost), (req, res) => {
    const course = service.addCourse(req.body);
    res.status(201).send(course);
});

coursesRoute.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(service.getCourse(id));
});

coursesRoute.delete("/:id", (req, res) => {
    const course = service.removeCourse(req.params.id);
    res.send(course);
});

coursesRoute.put("/:id", valid, (req, res) => {
    const course = service.updateCourse(req.params.id, req.body);
    res.send(course);
});

coursesRoute.get("/", (req, res) => {
    res.send(service.findCourses(req.query));
});

export default coursesRoute;
