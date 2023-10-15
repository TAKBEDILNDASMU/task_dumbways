let testimonialForHtml = ""

const fetchTestimonial = () => {
  return fetch("http://localhost:5000/api/testimonial")
    .then((res) => res.json())
    .then((json) => json)
}

async function showTestimonial() {
  testimonialForHtml = ""
  const dataTestimonial = await fetchTestimonial()
  dataTestimonial.forEach((item) => {
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
async function filterTestimonials(rating) {
  testimonialForHtml = ""

  const dataTestimonial = await fetchTestimonial()

  const dataFiltered = dataTestimonial.filter((data) => data.rating === rating)

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
