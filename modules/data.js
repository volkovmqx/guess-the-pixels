export function DataService(path) {
    this.path = path
    this.images = []
    this.selectedImage = {}

    this.loadChunk = (callback, errorCallback) => {
        return fetch(this.path).then(response => response.json()).then(data => {
            this.images = data
            this.images.length > 0 ? callback() : errorCallback()
        })
    }
    this.selectImage = () => {
        let random = Math.floor(Math.random() * this.images.length)
        this.selectedImage = this.images[random]
        this.images.splice(random, 1)
    }
    this.pop = (callback, errorCallback) => {
        if(this.images.length === 0) {
            this.loadChunk(() => {
                this.selectImage()
                callback()
            }, errorCallback)
        } else {
            this.selectImage()
            callback()
        }

    }
    this.preloadImage = async (size, callback) => {
        let new_image = new Image()
        new_image.src = this.selectedImage.urls[size]
        new_image.onload = () => {
            callback(new_image)
        }
    }
}