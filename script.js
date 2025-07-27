// 等待 DOM 完全載入後再執行
document.addEventListener('DOMContentLoaded', function() {
    
    // 初始化頁面動畫
    initPageAnimations();
    
    // 初始化進度條動畫
    initProgressBar();
    
    // 初始化返回首頁按鈕效果
    initHomeButton();
    
    // 初始化項目卡片動畫
    initProjectCards();
    
    // 添加鍵盤快捷鍵支持
    initKeyboardShortcuts();
});

// 頁面動畫初始化
function initPageAnimations() {
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
        // 初始設置內容為不可見
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(30px)';
        
        // 延遲顯示內容
        setTimeout(() => {
            mainContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 200);
    }
}

// 進度條動畫
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressStatus = document.querySelector('.progress-status');
    const progressContainer = document.querySelector('.progress-container');
    const progressHint = document.querySelector('.progress-hint');
    
    if (!progressFill || !progressPercentage || !progressStatus) return;
    
    // 更新狀態訊息和對應進度
    const statusStages = [
        { message: "正在初始化開發環境...", minProgress: 0, maxProgress: 29 },
        { message: "正在進行初期規劃...", minProgress: 30, maxProgress: 39 },
        { message: "正在編寫核心功能...", minProgress: 40, maxProgress: 54 },
        { message: "正在設計用戶界面...", minProgress: 55, maxProgress: 64 },
        { message: "正在優化性能開銷...", minProgress: 65, maxProgress: 74 },
        { message: "正在進行安全性測試...", minProgress: 75, maxProgress: 82 },
        { message: "正在進行最終佈署...", minProgress: 83, maxProgress: 91 }
    ];
    
    let currentProgress = 0;
    let currentStageIndex = 0;
    let isAnimating = false;
    let isCompleted = false;
    
    // 延遲啟動進度條動畫，初次載入進展到21%
    setTimeout(() => {
        updateToNextStage(21);
    }, 1000);
    
    function updateToNextStage(targetProgress = null) {
        if (isAnimating || isCompleted) return;
        
        // 如果沒有指定目標進度，計算下一階段的進度
        if (targetProgress === null) {
            if (currentProgress > 75) {
                // 超過75%後，下次更新必定設為90%
                targetProgress = 90;
                isCompleted = true;
                if (progressHint) {
                    progressHint.style.opacity = '0.3';
                    progressHint.style.pointerEvents = 'none';
                    progressHint.textContent = '開發即將完成';
                }
            } else {
                // 每次更新9-13%
                const increment = Math.floor(Math.random() * 5) + 9;
                targetProgress = Math.min(currentProgress + increment, 91);
            }
        }
        
        // 找到對應的階段
        let newStageIndex = currentStageIndex;
        for (let i = 0; i < statusStages.length; i++) {
            if (targetProgress >= statusStages[i].minProgress && targetProgress <= statusStages[i].maxProgress) {
                newStageIndex = i;
                break;
            }
        }
        
        // 更新狀態訊息
        if (newStageIndex !== currentStageIndex) {
            currentStageIndex = newStageIndex;
            progressStatus.textContent = statusStages[currentStageIndex].message;
        }
        
        animateProgress(targetProgress);
    }
    
    function animateProgress(targetProgress) {
        if (isAnimating) return;
        isAnimating = true;
        
        const startProgress = currentProgress;
        const progressDiff = targetProgress - startProgress;
        const duration = 1500; // 1.5秒動畫
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用緩動函數
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            currentProgress = startProgress + progressDiff * easeProgress;
            
            progressFill.style.width = currentProgress + '%';
            progressPercentage.textContent = Math.round(currentProgress) + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                currentProgress = targetProgress;
                isAnimating = false;
                
                // 如果還沒完成，設置下次隨機更新
                if (!isCompleted) {
                    setTimeout(() => {
                        // 每5秒有20%概率自動更新
                        if (Math.random() < 0.2) {
                            updateToNextStage();
                        }
                    }, 5000);
                }
            }
        }
        
        animate();
    }
    
    // 點擊進度條加速開發
    progressContainer.addEventListener('click', () => {
        if (!isCompleted) {
            updateToNextStage();
        }
    });
    
    // 滑鼠懸停效果
    progressContainer.addEventListener('mouseenter', () => {
        if (!isCompleted) {
            progressContainer.style.transform = 'scale(1.02)';
            progressContainer.style.transition = 'transform 0.3s ease';
            if (progressHint) {
                progressHint.style.opacity = '1';
                progressHint.style.color = '#FFB6C1';
            }
        }
    });
    
    progressContainer.addEventListener('mouseleave', () => {
        progressContainer.style.transform = 'scale(1)';
        if (progressHint && !isCompleted) {
            progressHint.style.opacity = '0.7';
            progressHint.style.color = '#87CEEB';
        }
    });
}

// 返回首頁按鈕效果
function initHomeButton() {
    const homeButton = document.querySelector('.home-button');
    
    if (homeButton) {
        homeButton.addEventListener('click', function(e) {
            // 添加點擊動畫
            this.style.transform = 'translateY(-2px) scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // 觸摸設備支持
        homeButton.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px) scale(0.95)';
        });
        
        homeButton.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

// 項目卡片動畫
function initProjectCards() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach((item, index) => {
        // 設置初始狀態
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // 延遲顯示每個項目
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 400 + (index * 100));
        
        // 添加懸停效果
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 鍵盤快捷鍵支持
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // ESC 鍵 - 返回首頁
        if (e.key === 'Escape') {
            const homeButton = document.querySelector('.home-button');
            if (homeButton) {
                homeButton.click();
            }
        }
        
        // H 鍵 - 返回首頁
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            const homeButton = document.querySelector('.home-button');
            if (homeButton) {
                homeButton.click();
            }
        }
        
        // R 鍵 - 重新載入頁面
        if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            location.reload();
        }
    });
}

// 項目狀態顏色動畫
function animateProjectStatus() {
    const statusElements = document.querySelectorAll('.project-status');
    
    statusElements.forEach((status, index) => {
        const text = status.textContent.trim();
        
        // 根據狀態設置不同的動畫效果
        if (text === '開發中') {
            status.style.animation = 'statusPulse 2s ease-in-out infinite';
            status.style.animationDelay = `${index * 0.3}s`;
        } else if (text === '規劃中') {
            status.style.animation = 'statusFade 3s ease-in-out infinite';
            status.style.animationDelay = `${index * 0.3}s`;
        } else if (text === '設計中') {
            status.style.animation = 'statusGlow 2.5s ease-in-out infinite';
            status.style.animationDelay = `${index * 0.3}s`;
        }
    });
}

// CSS 動畫樣式添加
function addStatusAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes statusPulse {
            0%, 100% {
                background: rgba(135, 206, 235, 0.2);
                border-color: rgba(135, 206, 235, 0.3);
            }
            50% {
                background: rgba(135, 206, 235, 0.4);
                border-color: rgba(135, 206, 235, 0.6);
            }
        }
        
        @keyframes statusFade {
            0%, 100% {
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
        }
        
        @keyframes statusGlow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(135, 206, 235, 0.3);
            }
            50% {
                box-shadow: 0 0 15px rgba(135, 206, 235, 0.6);
            }
        }
    `;
    document.head.appendChild(style);
}

// 滾動效果優化
function initScrollEffects() {
    // 如果頁面內容超出視窗高度，添加滾動效果
    if (document.body.scrollHeight > window.innerHeight) {
        const projectItems = document.querySelectorAll('.project-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        projectItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// 觸控設備優化
function initTouchOptimization() {
    if ('ontouchstart' in window) {
        // 為觸控元素添加觸覺反饋
        const touchElements = document.querySelectorAll('.home-button, .project-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
}

// 頁面可見性變化處理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 頁面重新可見時重啟動畫
        animateProjectStatus();
    }
});

// 窗口大小變化處理
window.addEventListener('resize', function() {
    // 重新計算動畫時機
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// 頁面載入完成後執行
window.addEventListener('load', function() {
    // 添加狀態動畫樣式
    addStatusAnimations();
    
    // 延遲啟動狀態動畫
    setTimeout(() => {
        animateProjectStatus();
    }, 1000);
    
    // 初始化滾動效果
    initScrollEffects();
    
    // 初始化觸控優化
    initTouchOptimization();
});

// 預載入優化
document.addEventListener('DOMContentLoaded', function() {
    // 預載入字體
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    fontLink.onload = function() {
        this.rel = 'stylesheet';
    };
    document.head.appendChild(fontLink);
});
