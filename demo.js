const Tasks = class TaskList {
  constructor() {
    this.apiRoot = 'https://push-code-assessment.herokuapp.com/v1/api';
    this.frag = document.createDocumentFragment();
  }

  checkStatus(response){
    // fetch doesn't reject a promise on a 404 or 500 server error;
    // throw on any non 2xx response.
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

  getTasksForUser(user, url, frag) {
    const userFrag = document.createDocumentFragment();
    const headline = document.createElement('h3');
    headline.textContent = user.name;

    const ul = document.createElement('ul');
    fetch(`${url}/users/${user.id}/tasks`)
      .then(TaskList.prototype.checkStatus)
      .then(response => response.json())
      .then((tasks) => {
        tasks.forEach((task) => {
          TaskList.prototype.buildTaskHTML(ul, task);
        });
      });
    return TaskList.prototype.buildUserHTML(headline, ul, userFrag, frag);
  }

  render() {
    const apiRoot = this.apiRoot;
    const fragment = this.frag;
    fetch(`${apiRoot}/users`)
      .then(TaskList.prototype.checkStatus)
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
