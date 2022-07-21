const Axios = require('axios');
const { createElement } = require('react');

const reset = async (newPass, confirm) => {
  try {
    // const res = await axios({
    //   method: 'PATCH',
    //   url: window.location.href,
    //   body: {
    //     password: newPass,
    //     passwordConfirm: confirm
    //   }
    // })
    const body= {
        password: newPass,
        passwordConfirm: confirm
      }
    const headers = {
      "Content-Type": "application/json"
    }
    const res = await Axios.patch(window.location.href, body)

    if (res.status !== 'ok') {
      throw new Error(res.data)
    }
    return res.status
  } catch (err) {
    return err.message
  }
}

document.querySelector(".form").addEventListener('onsubmit', e => {
  e.preventDefault();
console.log('hello');
  const newPass = document.getElementById('new').value
  const confirm = document.getElementById('confirm').value

  const alartContainer = document.getElementsByClassName('alart');
  const alart = document.createElement('p');
  alart.innerText = "Not matching!"
  if (newPass !== confirm) {
    alartContainer.classList.add("alert alert-warning alert-dismissible fade show");
    alartContainer.appendChild(alart);
  } else {
    alartContainer.classList.remove("alert alert-warning alert-dismissible fade show");
    alartContainer.removeChild(alart);
    const response = reset(newPass, confirm);

    const div = createElement('div');
    div.setAttribute('role', 'alert');
    const message = createElement('p')
    if (response === 'ok') {
      div.classList.add('alert alert-success');
      message.innerText('Password reset successful')
    } else {
      div.classList.add('alert alert-danger');
      message.innerText(response);
    }

    div.appendChild(message)
    const section = querySelector('section');
    section.insertBefore(div)
  }
  return
})