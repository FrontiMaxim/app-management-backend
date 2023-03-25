import express, { Express } from 'express';
import { json } from 'body-parser';
import { config } from 'dotenv';
import userController from './user/controllers/user.controller';
import { authorisation } from './middleware/authorisation';
import loginController from './login/controllers/login.controller';
import sessionController from './session/controllers/session.controller';
import path from 'path';
import objectController from './object/controllers/object.controller';
import taskController from './task/controllers/task.controller';
import resourceController from './resource/controllers/resource.controller';
import commentController from './comment/controllers/comment.controller';
import notificationController from './notification/controllers/notification.controller';

config();

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const LOGIN_PATH = '/login';
const USER_PATH = '/user';
const SESSION_PATH = '/session';
const OBJECT_PATH = '/object';
const TASK_PATH = '/task';
const RESOURCE_PATH = '/resource';
const COMMENT_PATH = '/comment';
const NOTIFICATION_PATH = '/notification';

app.use(json());

app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));
app.use('/resources', express.static(path.join(__dirname, 'public', 'resources')));

app.use(LOGIN_PATH, loginController);

app.use(authorisation);

app.use(SESSION_PATH, sessionController);

app.use(USER_PATH, userController);

app.use(OBJECT_PATH, objectController);

app.use(TASK_PATH, taskController);

app.use(RESOURCE_PATH, resourceController);

app.use(COMMENT_PATH, commentController);

app.use(NOTIFICATION_PATH, notificationController);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порте: ${PORT}`);
});

