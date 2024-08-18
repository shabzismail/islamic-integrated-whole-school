document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector('.video-container');
    const videos = [
        'videos/somali.mp4',
        'videos/arabic.mp4',
        'videos/reporter.mp4',
        'videos/video1',
        'videos/video2',
        'videos/video3',
        'videos/video4',
        // Add more video URLs as needed
    ];

    function createVideoElement(src) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';

        const video = document.createElement('video');
        video.src = src;
        video.loop = true;
        video.muted = true;
        video.setAttribute('playsinline', '');

        // Add error handling
        video.onerror = function() {
            console.error('Error loading video:', src);
            videoWrapper.innerHTML = `<p>Error loading video: ${src}</p>`;
        };

        // Add loaded data event
        video.onloadeddata = function() {
            console.log('Video loaded successfully:', src);
        };

        videoWrapper.appendChild(video);
        return videoWrapper;
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (entry.isIntersecting) {
                video.play().catch(e => console.error('Error playing video:', e));
            } else {
                video.pause();
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5
    });

    videos.forEach(videoSrc => {
        const videoElement = createVideoElement(videoSrc);
        videoContainer.appendChild(videoElement);
        observer.observe(videoElement);
    });
});