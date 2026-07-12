document.addEventListener('DOMContentLoaded', () => {
    // 1. Получаем ID курса из параметров URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    // Проверяем, существует ли база данных и нужный курс
    if (!courseId || typeof COURSES_DATA === 'undefined' || !COURSES_DATA[courseId]) {
        // Если курс не найден, перенаправляем на главную к разделу обучения
        window.location.href = 'index.html#academy';
        return;
    }

    const course = COURSES_DATA[courseId];

    // 2. Заполняем данные на странице
    
    // Заголовок вкладки браузера
    document.title = `${course.title} | Обучение в студии МЁД`;

    // Хлебные крошки
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = course.title;
    }

    // Заголовок курса
    const courseTitle = document.getElementById('course-title');
    if (courseTitle) {
        courseTitle.textContent = course.title;
    }

    // Изображение
    const courseImg = document.getElementById('course-img');
    if (courseImg) {
        courseImg.src = course.image;
        courseImg.alt = course.title;
    }

    // Стоимость
    const coursePrice = document.getElementById('course-price');
    if (coursePrice) {
        coursePrice.textContent = course.price;
    }

    // Длительность
    const courseDuration = document.getElementById('course-duration');
    if (courseDuration) {
        courseDuration.textContent = course.duration;
    }

    // Описание (генерируем параграфы)
    const courseDescContainer = document.getElementById('course-description');
    if (courseDescContainer) {
        courseDescContainer.innerHTML = '';
        if (Array.isArray(course.description)) {
            course.description.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                courseDescContainer.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.textContent = course.description;
            courseDescContainer.appendChild(p);
        }
    }

    // Программа обучения (генерируем список)
    const courseProgramList = document.getElementById('course-program');
    if (courseProgramList) {
        courseProgramList.innerHTML = '';
        if (Array.isArray(course.program) && course.program.length > 0) {
            course.program.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                courseProgramList.appendChild(li);
            });
        } else {
            // Скрываем секцию программы, если её нет
            const programSection = document.querySelector('.program-section');
            if (programSection) {
                programSection.style.display = 'none';
            }
        }
    }

    // Кнопка записи (обновляем ссылку)
    const enrollBtn = document.getElementById('course-enroll-btn');
    if (enrollBtn && course.targetUrl) {
        enrollBtn.href = course.targetUrl;
    }
});
