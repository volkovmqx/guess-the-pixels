export function Game (data, ui) {
    this.ui = ui
    this.data = data
    this.manually_revealed = false
    this.score = 100

    this.updateScore = (diff) => {
        this.score = this.score + diff
        this.ui.bindScore(this.score)
        this.ui.bindScoreChange(diff)
        if(this.score < 0) {
            this.finishGame();
            this.score = 0
            this.ui.bindScore(this.score)
        }
    }
    this.loadNext = (callback) => {
        this.data.pop(() => {
            this.data.preloadImage("custom", (new_image) => {
                this.manually_revealed = false
                this.ui.bindImage(new_image)
                this.ui.bindTitle(this.data.selectedImage.alt_description)
                this.ui.enableAllButtons()
                callback()
            })
        }, () => {
            this.ui.hideContainer()
            this.ui.showApiLimit()
        })
    }
    this.loadOriginal = (callback) => {
        this.data.preloadImage("regular", (new_image) => {
            this.ui.bindImage(new_image)
            callback()
        })
    };

    this.manualReveal = () => {
        this.manually_revealed = true
        this.updateScore(-5)
        this.ui.disableRevealButton()
        this.loadOriginal(() => {})
    }


    this.checkChoice = (choice) => {
        switch (choice) {
            case "views":
                return this.data.selectedImage.views > 1000000
            case "likes":
                return this.data.selectedImage.likes > 1000
            case "location":
                return this.data.selectedImage.location.country === "United States"
            default:
                return this.data.selectedImage.views < 1000000 && this.data.selectedImage.likes < 1000 && this.data.selectedImage.location.country !== "United States"
        }
    }

    this.vote = (choice) => {
        this.loadOriginal(() => {
            this.checkChoice(choice) ? this.updateScore(10) : this.updateScore(-10)
            this.ui.disableAllButtons()
            let timeToNext = this.manually_revealed ? 0 : 3000
            setTimeout(async () => {
                this.loadNext(() => {})
            }, timeToNext)
        })
    }

    this.finishGame = () => {
        this.ui.hideContainer()
        this.ui.showGameOver()
    }
    this.repeatGame = () => {
        this.loadNext(() => {
            this.updateScore(100)
            this.ui.showContainer()
            this.ui.hideGameOver()
        })
    }
    this.bindFunctionalities = () => {
        this.ui.bindRevealButton(this.manualReveal)
        this.ui.bindVoteButtons(this.vote)
        this.ui.bindRepeatButton(this.repeatGame)
    }

    this.render = () => {
        this.bindFunctionalities()
        this.loadNext(() => {
            this.ui.hideLoading()
            this.ui.showContainer()
        })
    }
}