class SpurITPlugin {
  constructor() {

    this.$button = document.querySelector(`#EventButton`)
    this.$body = document.querySelector(`body`)

    this.template = () => {

      const URL = `https://www.youtube.com/embed/tfPRGha6rn8`
      const WIDTH = `${window.innerWidth}px`
      const HEIGHT = `${window.innerWidth * (940 / 1920)}px`

      return `
        <section id="PopUp" class="popup">
          <div id="PopUpBG" class="popup__bg"></div>
          <iframe class="popup__content"
            width="${WIDTH}"
            height="${HEIGHT}"
            src="${URL}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write;encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </section>
      `.trim()
    }

  }

  init() {

    this.$button.addEventListener(`click`, (e) => this.clickEvent(e))

  }

  destroy() {

    this.$button.removeEventListener(`click`, this.clickEvent)

    return `Plugin was destroyed!`

  }

  clickEvent(e) {

    e.preventDefault()

    this.$button.setAttribute(`tabindex`, -1)

    this.$body.insertAdjacentHTML(`beforeend`, this.template())

    document.addEventListener(`keydown`, (i) => {
      if (i.keyCode === 27) { // "Esc" button
        this.removePopUp()
      }
    }, { once: true })

    document.querySelector(`#PopUpBG`).addEventListener(`click`, this.removePopUp)

  }

  removePopUp() {

    const $popup = document.querySelector(`#PopUp`)
    const $button = document.querySelector(`#EventButton`)

    if ($popup) {

      $button.setAttribute(`tabindex`, 1)
      $popup.remove()

    }
  }
}

const popUpPlugin = new SpurITPlugin()

console.table([
  {
    'Function': `popUpPlugin.init()`,
    'Description': `Run plugin logic`
  },
  {
    'Function': `popUpPlugin.destroy()`,
    'Description': `Destroy plugin logic`
  }
])
