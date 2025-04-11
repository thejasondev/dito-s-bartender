type GalleryItem = HTMLElement & {
  style: CSSStyleDeclaration;
};

export const initGallery = (): void => {
  const filterButtons =
    document.querySelectorAll<HTMLButtonElement>(".filter-btn");
  const galleryItems = document.querySelectorAll<GalleryItem>(".gallery-item");
  let currentCategory = "all";

  const showItem = (item: GalleryItem): void => {
    item.style.display = "";
    // Forzar reflow para asegurar animación
    void item.offsetHeight;
    requestAnimationFrame(() => {
      item.classList.remove("opacity-0", "scale-95");
      item.classList.add("opacity-100", "scale-100");
    });
  };

  const hideItem = (item: GalleryItem): void => {
    item.classList.remove("opacity-100", "scale-100");
    item.classList.add("opacity-0", "scale-95");
    // Esperar a que termine la animación antes de ocultar
    item.addEventListener(
      "transitionend",
      () => {
        if (item.classList.contains("opacity-0")) {
          item.style.display = "none";
        }
      },
      { once: true }
    );
  };

  const updateActiveButton = (clickedButton: HTMLButtonElement): void => {
    filterButtons.forEach((btn) => {
      const isActive = btn === clickedButton;
      btn.classList.toggle("bg-primary", isActive);
      btn.classList.toggle("text-white", isActive);
      btn.classList.toggle("border-primary", isActive);
    });
  };

  const filterGallery = (category: string): void => {
    if (category === currentCategory) return;

    currentCategory = category;

    galleryItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      if (category === "all" || itemCategory === category) {
        showItem(item);
      } else {
        hideItem(item);
      }
    });
  };

  // Mostrar todos los items al inicio
  galleryItems.forEach(showItem);

  // Configurar listeners de los botones
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      if (!category) return;

      updateActiveButton(button);
      filterGallery(category);
    });
  });
};
