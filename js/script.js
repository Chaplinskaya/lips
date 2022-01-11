'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modalForma = document.querySelectorAll('[data-forma]'),
          popup = document.querySelector('.popup'),
          modal = document.querySelector('.modal');

    function openModal() {
        popup.classList.add('show');
        popup.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    };
    function openModalForm() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    };
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    modalForma.forEach(item => {
        item.addEventListener('click', openModalForm);
    });
    function closeModal() {
        popup.classList.add('hide');
        popup.classList.remove('show');
        document.body.style.overflow = '';
    };
    function closeModalForm() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };
    popup.addEventListener('click', (e) => {
        if (e.target === popup || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && popup.classList.contains('show')) {
            closeModal();
        }
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModalForm();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModalForm();
        }
    });

//FORMS

const forms = document.querySelectorAll('form');
    
const message = {
    loading: 'Загрузка...',
    success: 'УРА! Спасибо! Мы скоро с Вами свяжемся...',
    failure: 'Что-то пошло не так'
};
forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        //form.append(statusMessage);
        modal.append(statusMessage);
        
        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
    
    //отправка на сервер формата formdata
    //request.setRequestHeader('Content-type','multipart/form-data');//заголовок не пишут в связке request+formtdate
        //const formData = new FormData(form);
        //request.send(formData);

    //отправка на сервер формата json
        request.setRequestHeader('Content-type','application/json');
        const formData = new FormData(form);
        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        request.send(json);//
        //для nodejs, php сервер не может работать с json или добавить строку в php файл: $_POST = json_decode(file_get_contents("php://input"), true);
    
        request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    statusMessage.remove();
                    form.reset(); 
                } else {
                    showThanksModal(message.failure);
                }
            });
    });
}
function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal-wrapper');
    prevModalDialog.classList.add('hide');
    //openModal();
    openModalForm();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal-wrapper');
    thanksModal.innerHTML = `
    <div class="modal-content">
        <div data-close class="modal__close">&times;</div>
        <div>${message}</div>
    </div>
    `;
    document.querySelector('.modal').append(thanksModal);//добавляем модальное окно на страницу
        setTimeout(() => {
            thanksModal.remove();
            closeModal();
            closeModalForm();
        }, 4000);
    };
});