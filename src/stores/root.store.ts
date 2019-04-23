import { RouterState, RouterStore } from 'mobx-state-router';
import { routes } from './routes';
import { observable } from 'mobx';

const notFound = new RouterState('notFound');

export class RootStore {
    routerStore = new RouterStore(this, routes, notFound);
}

export const rootStore = new RootStore();

export class UserObject {
    @observable username = "";
    @observable accountType = "";
}

export const userObject = new UserObject();
