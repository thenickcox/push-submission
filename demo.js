const Tasks = class TaskList {
  constructor() {
    this.apiRoot = 'https://push-code-assessment.herokuapp.com/v1/api';
    this.renderFragment = document.createDocumentFragment();
  }

  checkResponseStatus(response){
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  buildTaskHTML(ul, task) {
    const li = document.createElement('li');
    li.textContent = task;
    ul.appendChild(li);
  }

  buildUserHTML(headline, ul, fragment, parentFragment) {
    fragment.appendChild(headline);
    fragment.appendChild(ul);
    parentFragment.appendChild(fragment);
  }

  getTasksForUser(user, url, fragment) {
    const userFragment = document.createDocumentFragment();
    const headline = document.createElement('h3');
    headline.textContent = user.name;

    const ul = document.createElement('ul');
    fetch(`${url}/users/${user.id}/tasks`)
      .then(TaskList.prototype.checkResponseStatus)
      .then(response => response.json())
      .then((tasks) => {
        tasks.forEach((task) => {
          TaskList.prototype.buildTaskHTML(ul, task);
        });
      });
    return TaskList.prototype.buildUserHTML(headline, ul, userFragment, fragment);
  }

  render() {
    const apiRoot = this.apiRoot;
    const fragment = this.renderFragment;
    fetch(`${apiRoot}/users`)
      .then(TaskList.prototype.checkResponseStatus)
      .then(response => response.json())
      .then((users) => {
        users.forEach(user => TaskList.prototype.getTasksForUser(user, apiRoot, fragment));
      })
      .then(() => {
        document.body.appendChild(fragment);
      })
      .catch((e) => {
        throw e;
      });
  }
};

const taskList = new Tasks();
taskList.render();
