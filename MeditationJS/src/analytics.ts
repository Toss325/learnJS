import * as $ from 'jquery';

function createAnalitics(): object {
    
    let counter = 0;
    let isDdestroyed: boolean = false;

    const listener = (): number => counter ++;
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

window['analytics'] = createAnalitics();