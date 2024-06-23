import voice from "../img/voice.png";
import video from "../img/video.png";

export default class MediaCard {
  constructor() {
    this.page = document.body.querySelector("#root");
  }
  init() {
    this.addMainfield(this.page);
  }

  addMainfield(page) {
    const container = document.createElement("div");
    container.classList.add("container");
    const messField = document.createElement("div");
    messField.classList.add("message_field");
    container.append(messField);
    const search = document.createElement("div");
    search.classList.add("search");
    const input = document.createElement("input");
    input.classList.add("search_input");
    input.type = "text";
    search.append(input);
    const vAv = document.createElement("div");
    vAv.classList.add("voice_and_video");
    const imgVoice = document.createElement("img");
    imgVoice.src = voice;
    imgVoice.classList.add("img_voice");
    const imgVideo = document.createElement("img");
    imgVideo.src = video;
    imgVideo.classList.add("img_video");
    vAv.append(imgVoice);
    vAv.append(imgVideo);
    search.append(vAv);
    container.append(search);
    page.append(container);

    input.addEventListener("keyup", (event) => {
      if (event.code === "Enter") {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (data) => {
              const { latitude, longitude } = data.coords;
              const value = `[${latitude}, ${longitude}]`;
              this.addTextMassege(messField, input.value, value);
              input.value = "";
            },
            () => {
              this.manualInput(this.page, input.value, messField);
              input.value = "";
            }
          );
        }
      }
    });
  }

  addTextMassege(page, value, geo) {
    const textMes = document.createElement("div");
    textMes.classList.add("text_message");
    const time = document.createElement("p");
    time.classList.add("message_time");
    time.textContent = this.time();
    const text = document.createElement("p");
    text.textContent = value;
    text.classList.add("message_value_text");
    const geolac = document.createElement("value_geolocation");
    geolac.textContent = geo;
    textMes.append(time);
    textMes.append(text);
    textMes.append(geolac);
    page.append(textMes);
  }

  manualInput(page, value, pageCont) {
    const box = document.createElement("div");
    box.classList.add("modal_Input");
    const title = document.createElement("h2");
    title.classList.add("modal_Input_title");
    title.textContent = "Что-то пошло не так..";
    box.append(title);
    const textOne = document.createElement("p");
    textOne.classList.add("modal_Input_text");
    textOne.textContent =
      "К сожалению, нам удалось определить ваше местоположение, пожалуйста дайте разрешение или введите данные в ручную";
    const textTwo = document.createElement("p");
    textTwo.classList.add("modal_Input_text");
    textTwo.textContent = "Широта и долгота через запятую";
    box.append(textOne);
    box.append(textTwo);
    const input = document.createElement("input");
    input.classList.add("modal_Input_value");
    input.type = "text";
    box.append(input);
    const btnBox = document.createElement("div");
    btnBox.classList.add("modal_Input_btn");
    const btnOk = document.createElement("button");
    btnOk.classList.add("modal_Input_btn_ok");
    btnOk.textContent = "ок";
    const btnClose = document.createElement("button");
    btnClose.classList.add("modal_Input_btn_close");
    btnClose.textContent = "отмена";
    btnBox.append(btnOk);
    btnBox.append(btnClose);
    box.append(btnBox);

    page.append(box);

    btnOk.addEventListener("click", () => {
      const newValue = this.valid(input.value);
      box.remove();
      this.addTextMassege(pageCont, value, newValue);
    });
  }

  time() {
    const Data = new Date();
    const Year = Data.getFullYear();
    const Month = Data.getMonth();
    const Day = Data.getDate();
    const Hour = Data.getHours();
    const Minutes = Data.getMinutes();

    return ` ${Hour}:${Minutes} ${Day}-${Month + 1}-${Year}`;
  }

  valid(inputValue) {
    let newValue;

    newValue = inputValue.split(",");

    let one = newValue[0];
    let two = newValue[1];

    if (!two.startsWith(" ")) {
      two = " " + two;
    }

    let newValue2 = "[" + one + "," + two + "]";

    return newValue2;
  }
}
