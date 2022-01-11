const popupLinks = document.querySelector('.popup-link'),
      body = document.querySelector('body'),
      lockPadding = document.querySelector(".lock-padding");
let unlock = true;

const timeout = 800;

    popupLinks.addEventListener('click', function(e) {
        const popupName = popupLinks.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
    });

    const popupCloseIcon = document.querySelector('.close-popup');
    popupCloseIcon.addEventListener('click', function(e) {
        popupClose(popupCloseIcon.closest('.popup__modal'));
        e.preventDefault();
    });

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup__modal.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__modal-content')) {
                    popupClose(e.target.closest('.popup__modal'));
                }
            });
            
        }
    }
    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnlock();
            }
        }
    }
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offSetWidth + 'px';
        lockPadding.style.paddingRight = lockPaddingValue;
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
    }
    function bodyUnLock() {
        setTimeout(function() {
            lockPadding.style.paddingRight = '0px';
    
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
            }, timeout);
            unlock = false;
            setTimeout(function() {
                unlock = true;
            }, timeout);
    }
    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup__modal.open');
            popupClose(popupActive);
        }
    });