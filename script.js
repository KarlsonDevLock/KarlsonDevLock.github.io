document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector("#projectsDropdownBtn");
    const dropdownMenu = document.querySelector("#projectsDropdownMenu");

    if (!dropdownBtn || !dropdownMenu) return;

    // Toggle dropdown on click
    dropdownBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const isOpen = dropdownMenu.classList.toggle("show");
        dropdownBtn.closest(".dropdown").classList.toggle("is-open", isOpen);
        dropdownBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close on outside click (Bonus 1)
    document.addEventListener("click", function (e) {
        if (!dropdownMenu.contains(e.target) && !dropdownBtn.contains(e.target)) {
            dropdownMenu.classList.remove("show");
            dropdownBtn.closest(".dropdown").classList.remove("is-open");
            dropdownBtn.setAttribute("aria-expanded", "false");
        }
    });

    // Close on Escape key (accessibility bonus)
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && dropdownMenu.classList.contains("show")) {
            dropdownMenu.classList.remove("show");
            dropdownBtn.closest(".dropdown").classList.remove("is-open");
            dropdownBtn.setAttribute("aria-expanded", "false");
            dropdownBtn.focus();
        }
    });
});