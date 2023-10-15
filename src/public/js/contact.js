function getData() {
  // data collection
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // validation
  if (!validateData(name, phone, subject, message)) {
    return
  }

  // execute to email
  sendEmail(name, phone, subject, message)
}

function validateData(name, email, phone, subject, message) {
  if (name == "") {
    alert("Name can't be empty")
    return false
  } else if (email == "") {
    alert("Email can't be empty")
    return false
  } else if (phone == "") {
    alert("Phone can't be empty")
    return false
  } else if (subject == "") {
    alert("Subject can't be empty")
    return false
  } else if (message == "") {
    alert("Message can't be empty")
    return false
  }

  return true
}

function sendEmail(name, phone, subject, message) {
  const emailReceiver = "titanaprilian73@gmail.com"
  const emailBody = `Hai, my name is ${name}, can you call me in ${phone} to discuss ${message} project ?`
  const emailSubject = encodeURIComponent(subject)

  const mailtoLink = `mailto:${emailReceiver}?subject=${emailSubject}&body=${encodeURIComponent(
    emailBody
  )}`

  const link = document.createElement("a")

  link.href = mailtoLink
  link.click()
}
