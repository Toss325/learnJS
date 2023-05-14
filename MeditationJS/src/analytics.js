import * as $ from 'jquery';

function createAnalitics() {
    
    let counter = 0;
    let isDdestroyed = false;

    const listener = () => counter ++;
    $(document).on('click', listener);

    return {
        destroy()  {
            $(document).off('click', listener);
            isDdestroyed = true;
        },
        getClicks() {
            if (isDdestroyed) {
                return 'Analytics is destroyed. Total clicks = ${counter}';
            }
            return counter;
        }
    };
}

window.analytics = createAnalitics();