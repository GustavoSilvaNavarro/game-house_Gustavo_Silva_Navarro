/**
 * @license
 * ========================================================================
 * ScrollPos-Styler v0.7.1
 * https://github.com/acch/scrollpos-styler
 * ========================================================================
 * Copyright 2015 Achim Christ
 * Licensed under MIT (https://github.com/acch/scrollpos-styler/blob/master/LICENSE)
 * ======================================================================== */
 var ScrollPosStyler=function(t,r){"use strict";var o=0,a=!1,i=1,n="sps",c=t.getElementsByClassName(n),f="sps--abv",m="sps--blw",u="data-sps-offset";function l(s){var e=[];o=r.pageYOffset;for(var t=0;c[t];++t){var a=c[t],n=a.getAttribute(u)||i,l=a.classList.contains(f);(s||l)&&n<o?e.push({element:a,addClass:m,removeClass:f}):(s||!l)&&o<=n&&e.push({element:a,addClass:f,removeClass:m})}return e}function v(s){for(var e=0;s[e];++e){var t=s[e];t.element.classList.add(t.addClass),t.element.classList.remove(t.removeClass)}a=!1}var s={init:function(s){a=!0,s&&(s.spsClass&&(n=s.spsClass,c=t.getElementsByClassName(n)),i=s.scrollOffsetY||i,f=s.classAbove||f,m=s.classBelow||m,u=s.offsetTag||u);var e=l(!0);0<e.length?r.requestAnimationFrame(function(){v(e)}):a=!1}};return t.addEventListener("DOMContentLoaded",function(){r.setTimeout(s.init,1)}),r.addEventListener("scroll",function(){if(!a){var s=l(!1);0<s.length&&(a=!0,r.requestAnimationFrame(function(){v(s)}))}}),s}(document,window);

//Create objects
class Projects {
    constructor(nameIdea, descriptionIdea, emailContact) {
        this.nameIdea = nameIdea;
        this.descriptionIdea = descriptionIdea;
        this.emailContact = emailContact;
    }
};

class UI {
    addProject(project) {
        const projectList = document.querySelector('#projects-list');
        const idea = document.createElement('div');
        idea.classList.add('col-md-4');
        idea.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h4><strong>Project Name: </strong>${project.nameIdea}</h4>
                    <p>${project.descriptionIdea}</p>
                    <h6><strong>Contact Email</strong></h6>
                    <p>${project.emailContact}</p>
                    <div class="d-grid">
                        <a class="btn btn-danger" name="delete">Delete</a>
                    </div>
                </div>
            </div>
        `;

        projectList.append(idea);
    };

    resetForm() {
        document.getElementById('projectUser').reset();
    };

    deleteProject(tagElement) {
        if(tagElement.name == 'delete') {
            tagElement.parentElement.parentElement.parentElement.parentElement.remove();
            this.showNotification('Project deleted successfully', 'warning');
        }
    };

    showNotification(message, cssClass) {
        const divNotification = document.createElement('div');
        divNotification.className = `alert alert-${cssClass} mt-2`;
        divNotification.appendChild(document.createTextNode(message));

        const section = document.querySelector('#userProjects');
        const lists = document.getElementById('projects-list');
        section.insertBefore(divNotification, lists);

        //delete notification
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    };
};

const ui = new UI();

//EVENTS
//List the projects
const newProject = e => {
    e.preventDefault();

    const name = document.querySelector('#nameIdea').value;
    const description = document.querySelector('#descriptionIdea').value;
    const email = document.querySelector('#emailContact').value;

    const project = new Projects(name, description, email);

    if(name == '' || description == '' || email == '') {
        return ui.showNotification('Fill up the information', 'danger');
    };

    ui.addProject(project);
    ui.resetForm();
    ui.showNotification('Porject added successfully!', 'success');

};

const eraseProject = e => {
    ui.deleteProject(e.target);
};

document.querySelector('#projectUser').addEventListener('submit', newProject);
document.querySelector('#projects-list').addEventListener('click', eraseProject);