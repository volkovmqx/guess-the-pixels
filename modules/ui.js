export function UI (loader, game_container, photo_wrapper, game_over, api_limit, score, score_change, dom_image, dom_title, voteButtons, revealButton, repeatButton) {

    this.loader = loader
    this.game_container = game_container
    this.photo_wrapper = photo_wrapper
    this.game_over = game_over
    this.api_limit = api_limit
    this.score = score
    this.score_change = score_change
    this.dom_image = dom_image
    this.dom_title = dom_title
    this.voteButtons = voteButtons
    this.revealButton = revealButton
    this.repeatButton = repeatButton

    this.showLoading = () => {
        this.loader.classList.remove("hidden")
    }
    this.hideLoading = () => {
        this.loader.classList.add("hidden")
    }
    this.showContainer = () => {
        this.game_container.classList.remove("hidden")
    }
    this.hideContainer = () => {
        this.game_container.classList.add("hidden")
    }
    this.showGameOver = () => {
        this.game_over.classList.remove("hidden")
    }
    this.hideGameOver = () => {
        this.game_over.classList.add("hidden")
    }
    this.showApiLimit = () => {
        this.api_limit.classList.remove("hidden")
    }
    this.bindScore = (score) => {
        this.score.innerText = score;
    }
    this.bindScoreChange = (score_change) => {
        this.score_change.innerText =  score_change > 0 ? "+"+score_change : score_change;

        /* Animate */
        this.score_change.classList.remove("bounce", "red", "green")
        /* trigger css animation restart https://css-tricks.com/restart-css-animation/ */
        this.score_change.offsetWidth
        this.score_change.classList.add("bounce")
        score_change > 0 ? this.score_change.classList.add("green"): this.score_change.classList.add("red")
    }

    this.bindImage = (new_image) => {
        if (this.dom_image) {
            this.photo_wrapper.replaceChild(new_image, this.dom_image);
        } else {
            this.photo_wrapper.appendChild(new_image);
        }
        this.dom_image = new_image;
    };
    this.bindTitle = (title) => {
        this.dom_title.innerText = title ? title : "...";
    }

    this.bindRevealButton = (callback) => {
        this.revealButton.addEventListener("click", callback);
    };
    this.bindVoteButtons = (callback) => {
        this.voteButtons.forEach(element => {
            element.addEventListener("click", (e) => {
                callback(e.target.dataset.voteAttribute)
            });
        });
    }
    this.bindRepeatButton = (callback) => {
        this.repeatButton.addEventListener("click", callback);
    },
    this.disableRevealButton = () => {
        this.revealButton.classList.add("is-disabled");
        this.revealButton.disabled = true;
    }
    this.enableRevealButton = () => {
        this.revealButton.classList.remove("is-disabled");
        this.revealButton.disabled = false;
    }
    this.disableAllButtons = () => {
        this.disableRevealButton()
        this.voteButtons.forEach(element => {
            element.disabled = true
            element.classList.add("is-disabled")
        })
    }
    this.enableAllButtons = () => {
        this.enableRevealButton()
        this.voteButtons.forEach(element => {
            element.disabled = false
            element.classList.remove("is-disabled")
        })
    }
}