window.addEventListener('DOMContentLoaded', () => {
    let colors = ['crimson', 'blue', 'green', 'gold', 'blueviolet', 'darkorchid', 'deeppink', 'dodgerblue', 'lawngreen', 'magenta', 'yellowgreen', 'mediumslateblue', 'tomato', 'slateblue', 'orangered', 'mediumvioletred'],

        title = document.getElementById('title'),
        counter = document.getElementById('counter'),
        ball = document.getElementById('ball'),
        attempt = 10,
        direction = 'right',
        offset = 0;
    
    counter.innerHTML = attempt;                              // We write an invoice in the title
    ball.style.cssText = `left: ${offset}; top: ${offset};`;  // Ball in the upper left corner
    colorizeTitle(title);                                     // Create new title

    // Rewrite speed when user click on ball
    ball.addEventListener('click', event => {
        
        // Finish the game when the user clicked 10 times on the ball
        if (attempt <= 1) {
            gameResault(document.getElementById('resault'), 'You\'re winner!');
            counter.innerHTML = 0;         
        } else {
            attempt--;
            clearInterval(intervalId);
            intervalId = setInterval(moveBall, attempt);
            counter.innerHTML = attempt;

        }
    });

    // Game cycle
    let moveBall = function () {
        let playingField = document.getElementById('playing-field'),
            longRoad = playingField.clientWidth - ball.clientWidth;

        switch (direction) {
            case 'right':
                ball.style.left = offset + 'px';
                offset += SPEED
                if (offset > longRoad) {
                    offset = 0;
                    direction = 'down';
                }
                break;
            case 'down':
                ball.style.top = offset + 'px';
                offset += SPEED
                if (offset > longRoad) {
                    offset = longRoad;
                    direction = 'left';
                }
                break;
            case 'left':
                ball.style.left = offset + 'px';
                offset -= SPEED
                if (offset < 0) {
                    offset = longRoad;
                    direction = 'up';
                }
                break;
            case 'up':
                ball.style.top = offset + 'px';
                offset -= SPEED;
                if (offset < 0) {
                    offset = 0;
                    direction = 'right';
                }
                break;
        }
    };

    // Start first mooveing cycle
    let intervalId = setInterval(moveBall, attempt);

    // For finish game
    function gameResault(shownBlock, resaultText) {
        shownBlock.classList.add('show');
        shownBlock.getElementsByTagName('span')[0].innerHTML = resaultText;
    }

    // Colorize title
    function colorizeTitle(title) {
        let titleContent = title.innerHTML;
        
        title.innerHTML = '';
        
        // Make new title
        for (let i = 0; i < titleContent.length; i++) {
            let newElement = document.createElement('span');
            
            newElement.innerHTML = titleContent[i] == ' ' ? '&nbsp;' : titleContent[i];
            title.appendChild(newElement);
        }
        
        // Colorize title
        colorize(title.querySelectorAll('span'));
    }

    // Colorize a text function
    function colorize(title) {
        for (let i = 0; i < title.length; i++) {
            title[i].style.color = getRandomItemOfArray(colors);
        }

        setInterval(() => {
            title[Math.floor(Math.random() * title.length)].style.color = getRandomItemOfArray(colors);
        }, 500);
    }
        
    // Get random item from an array
    function getRandomItemOfArray(array) {
        if (Array.isArray(array)) {
            return array[Math.floor(Math.random() * array.length)];
        }

        console.log(new TypeError("Object isn't array!"));
    }
});