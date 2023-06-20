// prev next buttons
const prevButton = document.querySelector('.prevButton');
const nextButton = document.querySelector('.nextButton');
const timelineContainer = document.getElementById('main-timeline');
const timelineGroups = document.querySelectorAll('.timeline-group');
let currentIndex = 0;
let isScrolling = false;

nextButton.addEventListener('click', () => {
    if (currentIndex < timelineGroups.length - 1 && !isScrolling) {
        scrollToNextGroup();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0 && !isScrolling) {
        scrollToPreviousGroup();
    }
});

function scrollToNextGroup() {
    if (isScrolling) return;

    isScrolling = true;
    const nextIndex = currentIndex + 1;
    const targetGroup = timelineGroups[nextIndex];
    const targetOffset = targetGroup.offsetTop - timelineContainer.offsetTop;
    const initialOffset = timelineContainer.scrollTop;
    const distance = targetOffset - initialOffset;
    const duration = 500; // Tempo de duração da animação em milissegundos
    const startTime = performance.now();

    function scrollStep(timestamp) {
        const currentTime = timestamp - startTime;
        const scrollFraction = currentTime / duration;
        const scrollAmount = distance * scrollFraction;
        const newPosition = initialOffset + scrollAmount;

        timelineContainer.scrollTop = newPosition;

        if (currentTime < duration) {
            requestAnimationFrame(scrollStep);
        } else {
            currentIndex = nextIndex;
            isScrolling = false;
        }
    }

    requestAnimationFrame(scrollStep);
}

function scrollToPreviousGroup() {
    if (isScrolling) return;

    isScrolling = true;
    const previousIndex = currentIndex - 1;
    const targetGroup = timelineGroups[previousIndex];
    const targetOffset = targetGroup.offsetTop - timelineContainer.offsetTop;
    const initialOffset = timelineContainer.scrollTop;
    const distance = targetOffset - initialOffset;
    const duration = 500; // Tempo de duração da animação em milissegundos
    const startTime = performance.now();

    function scrollStep(timestamp) {
        const currentTime = timestamp - startTime;
        const scrollFraction = currentTime / duration;
        const scrollAmount = distance * scrollFraction;
        const newPosition = initialOffset + scrollAmount;

        timelineContainer.scrollTop = newPosition;

        if (currentTime < duration) {
            requestAnimationFrame(scrollStep);
        } else {
            currentIndex = previousIndex;
            isScrolling = false;
        }
    }

    requestAnimationFrame(scrollStep);
}
// cards
const circleElements = document.querySelectorAll('.circle');
const cardItems = document.querySelectorAll('.card-item');

circleElements.forEach(circleElement => {
    circleElement.addEventListener('click', () => {
        const cardItem = circleElement.closest('.item').querySelector('.card-item');
        toggleCardItem(cardItem);
    });
});

document.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if (!clickedElement.classList.contains('circle')) {
        cardItems.forEach(cardItem => {
            if (cardItem.classList.contains('show')) {
                toggleCardItem(cardItem);
            }
        });
    }
});

function toggleCardItem(cardItem) {
    cardItems.forEach(item => {
        if (item !== cardItem && item.classList.contains('show')) {
            item.classList.remove('show');
        }
    });

    cardItem.classList.toggle('show');
}