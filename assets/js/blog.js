const data = []

function getTechs() {
  const techs = []
  const techData = document.getElementsByClassName("tech-checkbox")
  const len = techData.length

  for (let i = 0; i < len; i++) {
    const parts = techData[i].value.split("|")
    const obj = {
      technology: parts[0],
      status: techData[i].checked,
      color: parts[1],
    }
    techs.push(obj)
  }

  return techs
}

function submitData(event) {
  event.preventDefault()

  let project = document.getElementById("input-blog-project").value
  let description = document.getElementById("description").value
  let startDate = document.getElementById("input-blog-start-date").value
  let endDate = document.getElementById("input-blog-end-date").value
  let image = document.getElementById("input-blog-image").files

  // get the image url
  image = URL.createObjectURL(image[0])

  // get the how many months to complete the project
  const startDateMonth = new Date(startDate).getMonth()
  const endDateMonth = new Date(endDate).getMonth()
  const duration = endDateMonth - startDateMonth

  const obj = {
    project,
    description,
    duration,
    image,
    postedAt: new Date(),
    technologies: getTechs(),
  }

  data.push(obj)

  console.log(data)

  renderBlog()
}

function renderBlog() {
  document.getElementById("contents").innerHTML = ""

  for (let i = 0; i < data.length; i++) {
    document.getElementById(
      "contents"
    ).innerHTML += `<div class="card" onclick="redirectToBlogDetail()">
    <img
      src="${data[i].image}"
      alt="dummy"
      class="card-image" />
    <h3 class="card-title">${data[i].project}</h3>
    <small>Duration: ${data[i].duration} Months</small>
    <p class="card-desc">
      ${data[i].description}
    </p>
    <div class="card-tech">
      ${data[i].technologies
        .map((tech) =>
          tech.status
            ? `<i class="fa-brands fa-${tech.technology}" style="color: ${tech.color}"></i>`
            : ""
        )
        .join("")}
      
    </div>
    <div class="card-btn">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>`
  }
}

function redirectToBlogDetail() {
  window.location.href = "blog-detail.html"
}
