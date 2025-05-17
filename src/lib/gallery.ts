type GalleryItem = HTMLElement & {
  style: CSSStyleDeclaration;
};

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
  placeholder?: string;
}

export const getGalleryImages = (): GalleryImage[] => {
  return [
    {
      src: "/images/mobile_bar.webp",
      alt: "Mobile bar at corporate event",
      title: "Mobile Bar Setup",
      category: "corporate",
      description: "Professional mobile bar setup for corporate events",
      placeholder: "/images/placeholders/mobile_bar-placeholder.webp",
    },
    {
      src: "/images/trago.webp",
      alt: "Signature cocktail",
      title: "Signature Cocktail",
      category: "cocktails",
      description: "Handcrafted signature cocktails",
      placeholder: "/images/placeholders/trago-placeholder.webp",
    },
    {
      src: "/images/boda.webp",
      alt: "Themed bar for wedding",
      title: "Wedding Bar",
      category: "weddings",
      description: "Themed bar for wedding",
      placeholder: "/images/placeholders/boda-placeholder.webp",
    },
    {
      src: "/images/bartender.webp",
      alt: "Bartending service at private party",
      title: "Private Event",
      category: "private",
      description: "Bartending service at private party",
      placeholder: "/images/placeholders/bartender-placeholder.webp",
    },
    {
      src: "/images/cocktail.webp",
      alt: "Cocktail presentation detail",
      title: "Cocktail Presentation",
      category: "cocktails",
      description: "Cocktail presentation detail",
      placeholder: "/images/placeholders/cocktail-placeholder.webp",
    },
    {
      src: "/images/foto2.webp",
      alt: "Mobile bar decorated for themed event",
      title: "Themed Event",
      category: "themed",
      description: "Mobile bar decorated for themed event",
      placeholder: "/images/placeholders/foto2-placeholder.webp",
    },
    {
      src: "/images/bar_wedding.webp",
      alt: "Bartender preparing cocktail at wedding",
      title: "Wedding Service",
      category: "weddings",
      description: "Bartender preparing cocktail at wedding",
      placeholder: "/images/placeholders/bar_wedding-placeholder.webp",
    },
    {
      src: "/images/foto1.webp",
      alt: "Custom cocktails for corporate event",
      title: "Corporate Cocktails",
      category: "cocktails",
      description: "Custom cocktails for corporate event",
      placeholder: "/images/placeholders/foto1-placeholder.webp",
    },
    {
      src: "/images/foto3.webp",
      alt: "Mobile bar at private event",
      title: "Private Event Bar",
      category: "private",
      description: "Mobile bar at private event",
      placeholder: "/images/placeholders/foto3-placeholder.webp",
    },
    {
      src: "/images/foto6.webp",
      alt: "Signature cocktail with special decoration",
      title: "Special Decoration",
      category: "cocktails",
      description: "Signature cocktail with special decoration",
      placeholder: "/images/placeholders/foto6-placeholder.webp",
    },
    {
      src: "/images/foto5.webp",
      alt: "Themed bar for Halloween party",
      title: "Themed Party",
      category: "themed",
      description: "Themed bar for Halloween party",
      placeholder: "/images/placeholders/foto5-placeholder.webp",
    },
    {
      src: "/images/foto7.webp",
      alt: "Bartending service for corporate event",
      title: "Corporate Service",
      category: "cocktails",
      description: "Bartending service for corporate event",
      placeholder: "/images/placeholders/foto7-placeholder.webp",
    },
  ];
};

export const initGallery = (): void => {
  const filterButtons =
    document.querySelectorAll<HTMLButtonElement>(".filter-btn");
  const galleryItems = document.querySelectorAll<GalleryItem>(".gallery-item");
  let currentCategory = "all";
  let animationInProgress = false;

  // Crear lightbox si no existe
  let lightbox = document.getElementById("gallery-lightbox") as HTMLDivElement;
  if (!lightbox) {
    // Crear el lightbox dinámicamente
    lightbox = document.createElement("div");
    lightbox.id = "gallery-lightbox";
    lightbox.className =
      "fixed inset-0 bg-black/90 z-50 hidden items-center justify-center";

    const lightboxContent = document.createElement("div");
    lightboxContent.id = "lightbox-content";
    lightboxContent.className =
      "max-w-5xl max-h-[80vh] flex items-center justify-center relative";

    const closeButton = document.createElement("button");
    closeButton.id = "lightbox-close";
    closeButton.className =
      "absolute top-6 right-6 text-white hover:text-gray-300 z-10";
    closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    const prevButton = document.createElement("button");
    prevButton.id = "lightbox-prev";
    prevButton.className =
      "absolute left-6 text-white hover:text-gray-300 z-10";
    prevButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;

    const nextButton = document.createElement("button");
    nextButton.id = "lightbox-next";
    nextButton.className =
      "absolute right-6 text-white hover:text-gray-300 z-10";
    nextButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    const caption = document.createElement("div");
    caption.id = "lightbox-caption";
    caption.className =
      "absolute bottom-8 left-0 right-0 text-center text-white";

    lightbox.appendChild(closeButton);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(caption);

    document.body.appendChild(lightbox);
  }

  // Referencias al lightbox
  const lightboxContent = document.getElementById(
    "lightbox-content"
  ) as HTMLDivElement;
  const lightboxCaption = document.getElementById(
    "lightbox-caption"
  ) as HTMLDivElement;
  const lightboxClose = document.getElementById(
    "lightbox-close"
  ) as HTMLButtonElement;
  const lightboxPrev = document.getElementById(
    "lightbox-prev"
  ) as HTMLButtonElement;
  const lightboxNext = document.getElementById(
    "lightbox-next"
  ) as HTMLButtonElement;

  let currentIndex = 0;
  let visibleItems: GalleryItem[] = Array.from(galleryItems);

  const showItem = (item: GalleryItem, delay: number = 0): Promise<void> => {
    return new Promise((resolve) => {
      item.style.display = "";

      // Aplicar un pequeño retraso para escalonar las animaciones
      setTimeout(() => {
        // Forzar reflow para asegurar animación
        void item.offsetHeight;
        requestAnimationFrame(() => {
          item.classList.remove("opacity-0", "scale-95");
          item.classList.add("opacity-100", "scale-100");

          // Esperar a que termine la animación antes de resolver
          item.addEventListener(
            "transitionend",
            () => {
              resolve();
            },
            { once: true }
          );
        });
      }, delay);
    });
  };

  const hideItem = (item: GalleryItem, delay: number = 0): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        item.classList.remove("opacity-100", "scale-100");
        item.classList.add("opacity-0", "scale-95");

        // Esperar a que termine la animación antes de ocultar
        item.addEventListener(
          "transitionend",
          () => {
            if (item.classList.contains("opacity-0")) {
              item.style.display = "none";
            }
            resolve();
          },
          { once: true }
        );
      }, delay);
    });
  };

  const updateActiveButton = (clickedButton: HTMLButtonElement): void => {
    filterButtons.forEach((btn) => {
      const isActive = btn === clickedButton;
      btn.classList.toggle("bg-primary", isActive);
      btn.classList.toggle("text-white", isActive);
      btn.classList.toggle("border-primary", isActive);

      // Si no está activo, asegurarse de que tiene el estilo correcto
      if (!isActive) {
        btn.classList.add("text-primary");
      } else {
        btn.classList.remove("text-primary");
      }
    });
  };

  const filterGallery = async (category: string): Promise<void> => {
    if (category === currentCategory || animationInProgress) return;

    animationInProgress = true;
    currentCategory = category;

    // Identificar qué elementos deben mostrarse y cuáles ocultarse
    const itemsToShow: GalleryItem[] = [];
    const itemsToHide: GalleryItem[] = [];

    galleryItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      if (category === "all" || itemCategory === category) {
        itemsToShow.push(item);
      } else {
        itemsToHide.push(item);
      }
    });

    // Primero ocultar los elementos que no corresponden a la categoría
    const hidePromises = itemsToHide.map((item, index) =>
      hideItem(item, index * 20)
    );

    await Promise.all(hidePromises);

    // Luego mostrar los elementos que corresponden a la categoría, con efecto escalonado
    const showPromises = itemsToShow.map((item, index) => {
      if (window.getComputedStyle(item).display === "none") {
        return showItem(item, index * 30);
      }
      return Promise.resolve();
    });

    await Promise.all(showPromises);

    // Actualizar la lista de elementos visibles
    visibleItems = Array.from(galleryItems).filter(
      (item) => window.getComputedStyle(item).display !== "none"
    ) as GalleryItem[];

    animationInProgress = false;
  };

  // Funcionalidad de lightbox
  function openLightbox(index: number): void {
    if (index < 0 || index >= visibleItems.length) return;

    currentIndex = index;
    const item = visibleItems[index];
    const img = item.querySelector("img");
    const title = item.querySelector("h3");
    const description = item.querySelector("p");

    if (!img) return;

    lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="max-w-full max-h-[70vh] object-contain" />`;

    let captionHTML = "";
    if (title)
      captionHTML += `<h3 class="text-xl font-bold">${title.textContent}</h3>`;
    if (description)
      captionHTML += `<p class="text-white/80">${description.textContent}</p>`;
    lightboxCaption.innerHTML = captionHTML;

    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(): void {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    document.body.style.overflow = "";
  }

  function showPrevImage(): void {
    currentIndex =
      (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
  }

  function showNextImage(): void {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox(currentIndex);
  }

  // Mostrar todos los items al inicio con un efecto escalonado
  const initialShowPromises = Array.from(galleryItems).map((item, index) => {
    return showItem(item, index * 30);
  });

  Promise.all(initialShowPromises).then(() => {
    // Activar el botón "all" por defecto
    const allButton = Array.from(filterButtons).find(
      (btn) => btn.dataset.category === "all"
    );
    if (allButton) {
      updateActiveButton(allButton);
    }
  });

  // Configurar listeners de los botones de filtro
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      if (!category) return;

      updateActiveButton(button);
      filterGallery(category);
    });
  });

  // Configurar listeners para el lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const visibleIndex = visibleItems.indexOf(item);
      if (visibleIndex !== -1) {
        openLightbox(visibleIndex);
      }
    });
  });

  // Event listeners para el lightbox
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", showPrevImage);
  lightboxNext.addEventListener("click", showNextImage);

  // Cerrar con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
  });

  // Cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
};
