// Gallery Filtering Functionality

document.addEventListener('DOMContentLoaded', function() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryPhotos = document.querySelectorAll('.gallery-photo');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get filter category
      const filterCategory = this.getAttribute('data-filter');
      
      // Filter photos
      galleryPhotos.forEach(photo => {
        const photoCategory = photo.getAttribute('data-category');
        
        if (filterCategory === 'all') {
          // Show all photos
          photo.classList.remove('hide');
          photo.classList.add('show');
        } else if (photoCategory === filterCategory) {
          // Show matching photos
          photo.classList.remove('hide');
          photo.classList.add('show');
        } else {
          // Hide non-matching photos
          photo.classList.remove('show');
          photo.classList.add('hide');
        }
      });
    });
  });
});
