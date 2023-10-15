const dataTestiomonial = [
  {
    name: "Asta",
    comment: "Tidak pernah menyerah adalah sihirku",
    rating: 2,
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Eren",
    comment: "Jadi inikah kebebasan ?",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Thorfinn",
    comment: "Aku tidak mempunyai musuh",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Patrick",
    comment: "Dunia ini tidak adil, jadi biasakan dirimu",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
]

function showTestimonial() {
  let testimonialForHtml = ""

  dataTestiomonial.forEach((item) => {
    testimonialForHtml += `
        <div class="testimonial">
          <img src=${item.image} class="profile-testimonial" />
          <p class="quote">${item.comment}</p>
          <p class="author">- ${item.name}</p>
        </div>
      `
  })

  document.getElementById("testimonials").innerHTML = testimonialForHtml
}

showTestimonial()

// function for filtering
function filterTestimonials(rating) {
  let testimonialForHtml = ""

  const dataFiltered = dataTestiomonial.filter((data) => data.rating === rating)

  if (dataFiltered.length === 0) {
    testimonialForHtml = `<h3>Data not found !</h3>`
  } else {
    dataFiltered.forEach((item) => {
      testimonialForHtml += `
          <div class="testimonial">
            <img src=${item.image} class="profile-testimonial" />
            <p class="quote">${item.comment}</p>
            <p class="author">- ${item.name}</p>
          </div>
        `
    })
  }

  document.getElementById("testimonials").innerHTML = testimonialForHtml
}
