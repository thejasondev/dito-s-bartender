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
      src: "/images/trailer_bar.webp",
      alt: "Bar móvil en evento corporativo",
      title: "Bar Móvil Corporativo",
      category: "corporate",
      description:
        "Servicio de bar móvil profesional para eventos empresariales",
      placeholder: "/images/placeholders/trailer_bar-placeholder.webp",
    },
    {
      src: "/images/trago.webp",
      alt: "Cóctel exclusivo",
      title: "Cóctel Signature",
      category: "cocktails",
      description: "Cócteles artesanales elaborados con maestría",
      placeholder: "/images/placeholders/trago-placeholder.webp",
    },
    {
      src: "/images/boda.webp",
      alt: "Bar temático para boda",
      title: "Bar para Bodas",
      category: "weddings",
      description: "Bar temático personalizado para tu día especial",
      placeholder: "/images/placeholders/boda-placeholder.webp",
    },
    {
      src: "/images/bartender.webp",
      alt: "Servicio de bartender en evento privado",
      title: "Eventos Privados",
      category: "private",
      description: "Servicio personalizado de bartender para eventos privados",
      placeholder: "/images/placeholders/bartender-placeholder.webp",
    },
    {
      src: "/images/cocktail.webp",
      alt: "Detalle de presentación de cócteles",
      title: "Arte en Coctelería",
      category: "cocktails",
      description: "Detalles artísticos en la presentación de cada cóctel",
      placeholder: "/images/placeholders/cocktail-placeholder.webp",
    },
    {
      src: "/images/foto2.webp",
      alt: "Bar móvil decorado para evento temático",
      title: "Evento Temático",
      category: "themed",
      description: "Bar móvil decorado según la temática del evento",
      placeholder: "/images/placeholders/foto2-placeholder.webp",
    },
    {
      src: "/images/drink.webp",
      alt: "Cóctel colorido",
      title: "Cóctel Especial",
      category: "cocktails",
      description: "Cócteles creativos con presentaciones únicas",
      placeholder: "/images/placeholders/drink-placeholder.webp",
    },
    {
      src: "/images/bar_wedding.webp",
      alt: "Bartender preparando cóctel en boda",
      title: "Servicio de Bodas",
      category: "weddings",
      description: "Servicio profesional de coctelería para bodas",
      placeholder: "/images/placeholders/bar_wedding-placeholder.webp",
    },
    {
      src: "/images/foto1.webp",
      alt: "Cócteles personalizados para evento corporativo",
      title: "Cócteles Corporativos",
      category: "cocktails",
      description: "Cócteles personalizados para eventos empresariales",
      placeholder: "/images/placeholders/foto1-placeholder.webp",
    },
    {
      src: "/images/foto3.webp",
      alt: "Bar móvil en evento privado",
      title: "Bar Privado",
      category: "private",
      description: "Servicio de bar móvil para eventos privados",
      placeholder: "/images/placeholders/foto3-placeholder.webp",
    },
    {
      src: "/images/foto6.webp",
      alt: "Cóctel con decoración especial",
      title: "Decoración Especial",
      category: "cocktails",
      description: "Signature cocktail with special decoration",
      placeholder: "/images/placeholders/foto6-placeholder.webp",
    },
    {
      src: "/images/foto5.webp",
      alt: "Bar temático para fiesta de Halloween",
      title: "Fiesta Temática",
      category: "themed",
      description: "Bar temático para fiesta de Halloween",
      placeholder: "/images/placeholders/foto5-placeholder.webp",
    },
    {
      src: "/images/foto7.webp",
      alt: "Servicio de bartender para evento corporativo",
      title: "Servicio Corporativo",
      category: "cocktails",
      description: "Servicio de bartender para evento corporativo",
      placeholder: "/images/placeholders/foto7-placeholder.webp",
    },
    {
      src: "/images/bar_table.webp",
      alt: "Bar temático para cualquier fiesta",
      title: "Bar Temático",
      category: "themed",
      description: "Bar temático para cualquier fiesta",
      placeholder: "/images/placeholders/bar_table-placeholder.webp",
    },
    {
      src: "/images/make_cocktail2.webp",
      alt: "Dito's preparando un cóctel",
      title: "Dito's haciendo su magia",
      category: "cocktails",
      description: "Preparando un cóctel",
      placeholder: "/images/placeholders/make_cocktail2-placeholder.webp",
    },
  ];
};

export const initGallery = (): void => {
  // Esperamos a que todo el DOM esté cargado para evitar problemas de timing
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGalleryElements);
  } else {
    initGalleryElements();
  }
};

const initGalleryElements = (): void => {
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

  // Configurar la observación de las imágenes para la carga progresiva
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  // Observer para el efecto de carga inicial
  const initialObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target as GalleryItem;
        setTimeout(() => {
          item.classList.remove("opacity-0", "scale-95");
          item.classList.add("opacity-100", "scale-100");
        }, parseInt(item.getAttribute("data-index") || "0") * 30);
        observer.unobserve(item);
      }
    });
  }, observerOptions);

  // Añadir índices a los elementos de la galería
  galleryItems.forEach((item, index) => {
    item.setAttribute("data-index", index.toString());
    // Observar el elemento para la carga inicial
    initialObserver.observe(item);
  });

  const showItem = (item: GalleryItem, delay: number = 0): Promise<void> => {
    return new Promise((resolve) => {
      // Asegurarse de que el elemento sea visible
      item.style.display = "";

      // Aplicar un pequeño retraso para escalonar las animaciones
      setTimeout(() => {
        // Forzar reflow para asegurar animación
        void item.offsetHeight;
        requestAnimationFrame(() => {
          item.classList.remove("opacity-0", "scale-95");
          item.classList.add("opacity-100", "scale-100");

          // Esperar a que termine la animación antes de resolver
          const transitionEndHandler = () => {
            resolve();
          };

          item.addEventListener("transitionend", transitionEndHandler, {
            once: true,
          });

          // Establecer un timeout como respaldo en caso de que el evento transitionend no se dispare
          setTimeout(() => {
            item.removeEventListener("transitionend", transitionEndHandler);
            resolve();
          }, 500);
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
        const transitionEndHandler = () => {
          if (item.classList.contains("opacity-0")) {
            item.style.display = "none";
          }
          resolve();
        };

        item.addEventListener("transitionend", transitionEndHandler, {
          once: true,
        });

        // Establecer un timeout como respaldo en caso de que el evento transitionend no se dispare
        setTimeout(() => {
          item.removeEventListener("transitionend", transitionEndHandler);
          if (item.classList.contains("opacity-0")) {
            item.style.display = "none";
          }
          resolve();
        }, 500);
      }, delay);
    });
  };

  const updateActiveButton = (clickedButton: HTMLButtonElement): void => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("bg-primary", "text-white");
      btn.classList.add("text-primary");
    });

    // Activar el botón clickeado
    clickedButton.classList.add("bg-primary", "text-white");
    clickedButton.classList.remove("text-primary");
  };

  const filterGallery = async (category: string): Promise<void> => {
    if (category === currentCategory || animationInProgress) return;

    animationInProgress = true;
    currentCategory = category;

    console.log(`Filtrando por categoría: ${category}`);

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

    console.log(
      `Elementos a mostrar: ${itemsToShow.length}, Elementos a ocultar: ${itemsToHide.length}`
    );

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

  // Configurar listeners de los botones de filtro
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      if (!category) return;

      console.log(`Botón de filtro clickeado: ${category}`);
      updateActiveButton(button);
      filterGallery(category);
    });
  });

  // Asegurarse de que el botón "all" esté activo por defecto
  const allButton = Array.from(filterButtons).find(
    (btn) => btn.dataset.category === "all"
  );
  if (allButton) {
    updateActiveButton(allButton);
  }

  // Configurar listeners para el lightbox
  galleryItems.forEach((item) => {
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
