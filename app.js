// ===================================
// The Echo Box - Complete JavaScript
// Version: 3.0 Production
// Last Updated: January 2026
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    
    // =======================================================
    // 1. 环境判官 (The Environment Judge)
    // - 已为三个Vercel子域名配置了正确的Gumroad链接
    // =======================================================
    const currentDomain = window.location.hostname;
    
    const themes = {
        // --- 生产环境域名 (未来使用) ---
        'the-echobox.com': { 
            css: 'themes/theme-echobox.css',
            title: 'The Echo Box',
            subtitle: 'Leave an echo, not just a memory.',
            placeholder: 'In the silence between your victories, what is the one truth you fear might die with you?',
            buttonText: 'IMPRINT INTO ETERNITY',
            gumroadLink: 'https://samzhu168.gumroad.com/l/fmrrxr',
            certificateTitle: 'CERTIFICATE OF LEGACY'
        },
        'lovescribe.net': { 
            css: 'themes/theme-lovescribe.css',
            title: 'LoveScribe',
            subtitle: 'Seal your love for the future.',
            placeholder: 'If the world ended tomorrow, what is the one memory of us that you would want to save from the fire?',
            buttonText: 'SEAL OUR VOW',
            gumroadLink: 'https://samzhu168.gumroad.com/l/sjuokv',
            certificateTitle: 'CERTIFICATE OF ETERNAL LOVE'
        },
        'futurebloom.io': {
            css: 'themes/theme-futurebloom.css',
            title: 'FutureBloom',
            subtitle: 'A letter to your child\'s 18th birthday.',
            placeholder: 'When they are old enough to understand, what is the courage you want them to find in your words?',
            buttonText: 'SEND TO THE FUTURE',
            gumroadLink: 'https://samzhu168.gumroad.com/l/htoqgu',
            certificateTitle: 'LETTER TO THE FUTURE'
        },

        // --- Vercel 免费子域名 (当前使用) ---
        'the-echo-box.vercel.app': {
            css: 'themes/theme-echobox.css',
            title: 'The Echo Box',
            subtitle: 'Leave an echo, not just a memory.',
            placeholder: 'In the silence between your victories...',
            buttonText: 'IMPRINT INTO ETERNITY',
            gumroadLink: 'https://samzhu168.gumroad.com/l/fmrrxr',
            certificateTitle: 'CERTIFICATE OF LEGACY'
        },
        'lovescribe-app.vercel.app': {
            css: 'themes/theme-lovescribe.css',
            title: 'LoveScribe',
            subtitle: 'Seal your love for the future.',
            placeholder: 'If the world ended tomorrow, what is the one memory of us that you would want to save from the fire?',
            buttonText: 'SEAL OUR VOW',
            gumroadLink: 'https://samzhu168.gumroad.com/l/sjuokv',
            certificateTitle: 'CERTIFICATE OF ETERNAL LOVE'
        },
        'futurebloom-app.vercel.app': {
            css: 'themes/theme-futurebloom.css',
            title: 'FutureBloom',
            subtitle: 'A letter to your child\'s 18th birthday.',
            placeholder: 'When they are old enough to understand, what is the courage you want them to find in your words?',
            buttonText: 'SEND TO THE FUTURE',
            gumroadLink: 'https://samzhu168.gumroad.com/l/htoqgu',
            certificateTitle: 'LETTER TO THE FUTURE'
        },

        // --- 本地测试域名 ---
        '127.0.0.1': { 
            css: 'themes/theme-echobox.css',
            title: 'The Echo Box (Test)',
            subtitle: 'Leave an echo, not just a memory.',
            placeholder: 'In the silence between your victories, what is the one truth you fear might die with you?',
            buttonText: 'IMPRINT INTO ETERNITY',
            gumroadLink: 'https://samzhu168.gumroad.com/l/fmrrxr',
            certificateTitle: 'CERTIFICATE OF LEGACY'
        },
        'localhost': { 
            css: 'themes/theme-echobox.css',
            title: 'The Echo Box (Local)',
            subtitle: 'Leave an echo, not just a memory.',
            placeholder: 'In the silence between your victories, what is the one truth you fear might die with you?',
            buttonText: 'IMPRINT INTO ETERNITY',
            gumroadLink: 'https://samzhu168.gumroad.com/l/fmrrxr',
            certificateTitle: 'CERTIFICATE OF LEGACY'
        }
    };
    
    // 默认主题（防止直接用未知域名访问）
    const defaultTheme = themes['the-echo-box.vercel.app'];
    const currentTheme = themes[currentDomain] || defaultTheme;
    
    // =======================================================
    // 2. 动态注入皮肤和内容 (Dynamic Injection)
    // =======================================================
    function applyTheme(theme) {
        // 1. 动态加载CSS
        const head = document.head;
        const existingTheme = document.getElementById('theme-stylesheet');
        if (existingTheme) {
            existingTheme.href = theme.css;
        } else {
            const link = document.createElement('link');
            link.id = 'theme-stylesheet';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = theme.css;
            head.appendChild(link);
        }

        // 2. 动态修改HTML内容
        document.title = theme.title;
        document.querySelector('header h1').innerText = theme.title;
        document.querySelector('header .subtitle').innerText = theme.subtitle;
        document.getElementById('legacy-text').placeholder = theme.placeholder;
        document.getElementById('imprint-button').innerText = theme.buttonText;
        
        // 3. 动态设置 Gumroad 链接
        const paymentButton = document.querySelector('.payment-button');
        if (paymentButton && theme.gumroadLink) {
            paymentButton.href = theme.gumroadLink;
        }
    }
    
    applyTheme(currentTheme);

    // =======================================================
    // 3. 核心应用逻辑 (Core Application Logic)
    // =======================================================
    const imprintButton = document.getElementById('imprint-button');
    const legacyText = document.getElementById('legacy-text');
    const resultSection = document.getElementById('result-section');
    const inputSection = document.getElementById('input-section');
    const canvas = document.getElementById('certificate-canvas');
    const loadingOverlay = document.getElementById('loading-overlay');
    const downloadWatermarkedButton = document.getElementById('download-watermarked-button');
    const loadingTextEl = document.getElementById('loading-text');
    const ctx = canvas.getContext('2d');
    let isSubmitting = false;

    // 加载消息轮播
    const loadingMessages = [
        "Imprinting into the digital ether...",
        "Sealing your words in time...",
        "Consulting the universe...",
        "Encrypting your legacy...",
        "Creating permanence..."
    ];
    let loadingMessageIndex = 0;
    let loadingInterval = null;
    
    imprintButton.addEventListener('click', () => {
        if (isSubmitting) { return; }

        const text = legacyText.value;
        if (text.trim() === '') {
            alert('Your echo cannot be empty.');
            return;
        }
        
        isSubmitting = true;
        showLoading(true);
        
        setTimeout(() => {
            try {
                generateCertificate(text, true);
                showLoading(false);
                inputSection.classList.add('hidden');
                resultSection.classList.remove('hidden');
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch (error) {
                console.error("Error generating certificate:", error);
                alert("An error occurred. Please try again.");
                showLoading(false);
            } finally {
                isSubmitting = false;
            }
        }, 3000);
    });

    downloadWatermarkedButton.addEventListener('click', () => {
        const filename = `${currentTheme.title.replace(/\s+/g, '_')}_Preview.png`;
        downloadCanvasAsImage(filename);
    });

    function showLoading(isLoading) {
        if (isLoading) {
            loadingOverlay.classList.remove('hidden');
            loadingMessageIndex = 0;
            if (loadingTextEl) {
                loadingTextEl.textContent = loadingMessages[0];
                loadingInterval = setInterval(() => {
                    loadingMessageIndex = (loadingMessageIndex + 1) % loadingMessages.length;
                    loadingTextEl.textContent = loadingMessages[loadingMessageIndex];
                }, 1500);
            }
        } else {
            loadingOverlay.classList.add('hidden');
            if (loadingInterval) {
                clearInterval(loadingInterval);
                loadingInterval = null;
            }
        }
    }
    
    function downloadCanvasAsImage(filename) {
        try {
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error("Error downloading image:", error);
            alert("Download failed. Please try taking a screenshot.");
        }
    }
    
    // =======================================================
    // 4. 证书生成函数 (完整实现)
    // =======================================================
    function generateCertificate(text, withWatermark) {
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, width, height);
        
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 8;
        ctx.strokeRect(40, 40, width - 80, height - 80);
        
        ctx.lineWidth = 2;
        ctx.strokeRect(60, 60, width - 120, height - 120);
        
        drawCornerOrnaments();
        
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 48px Cinzel, serif';
        ctx.textAlign = 'center';
        ctx.fillText(currentTheme.certificateTitle, width / 2, 140);
        
        ctx.fillStyle = '#999';
        ctx.font = '18px Inter, sans-serif';
        ctx.fillText('OFFICIALLY SEALED IN THE VAULT', width / 2, 180);
        
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(width - 200, 200);
        ctx.stroke();
        
        ctx.fillStyle = '#e0e0e0';
        ctx.font = '22px Inter, sans-serif';
        ctx.textAlign = 'left';
        wrapText(ctx, text, 120, 260, width - 240, 32);
        
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        ctx.fillStyle = '#D4AF37';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Sealed on ${date}`, width / 2, height - 100);
        
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(300, height - 80);
        ctx.lineTo(width - 300, height - 80);
        ctx.stroke();
        
        const id = generateCertificateId();
        ctx.fillStyle = '#666';
        ctx.font = '12px monospace';
        ctx.fillText(`Certificate ID: ${id}`, width / 2, height - 50);
        
        if (withWatermark) {
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = '#D4AF37';
            ctx.font = 'bold 90px Arial';
            ctx.textAlign = 'center';
            ctx.translate(width / 2, height / 2);
            ctx.rotate(-Math.PI / 6);
            ctx.fillText('PREVIEW', 0, 30);
            ctx.restore();
        }
    }
    
    // 装饰性角落图案
    function drawCornerOrnaments() {
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2;
        
        const offset = 80;
        const size = 20;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(offset + size, offset);
        ctx.lineTo(offset, offset);
        ctx.lineTo(offset, offset + size);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(canvas.width - offset - size, offset);
        ctx.lineTo(canvas.width - offset, offset);
        ctx.lineTo(canvas.width - offset, offset + size);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(offset + size, canvas.height - offset);
        ctx.lineTo(offset, canvas.height - offset);
        ctx.lineTo(offset, canvas.height - offset - size);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(canvas.width - offset - size, canvas.height - offset);
        ctx.lineTo(canvas.width - offset, canvas.height - offset);
        ctx.lineTo(canvas.width - offset, canvas.height - offset - size);
        ctx.stroke();
    }
    
    // =======================================================
    // 5. 文本自动换行函数 (完整实现)
    // =======================================================
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let lineCount = 0;
        const maxLines = 8;
        
        context.textAlign = 'center'; // Center the text within the column
        x = x + maxWidth / 2;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line.trim(), x, y);
                line = words[n] + ' ';
                y += lineHeight;
                lineCount++;
                
                if (lineCount >= maxLines) {
                    context.fillText(line.trim() + '...', x, y);
                    return;
                }
            } else {
                line = testLine;
            }
        }
        context.fillText(line.trim(), x, y);
    }
    
    // =======================================================
    // 6. 辅助函数
    // =======================================================
    function generateCertificateId() {
        const prefix = currentTheme.title.substring(0, 2).toUpperCase();
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    }
    
    // =======================================================
    // 7. 错误处理和日志
    // =======================================================
    console.log(`Theme loaded: ${currentTheme.title}`);
    console.log(`Domain: ${currentDomain}`);
    console.log(`Gumroad Link: ${currentTheme.gumroadLink}`);
    
    window.addEventListener('error', (event) => {
        console.error('Application error:', event.error, event.message);
    });
});
