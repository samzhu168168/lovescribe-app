// ===================================
// The Echo Box - 背景图修复版
// 带详细调试信息
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    
    function getTheme() {
        const hostname = window.location.hostname.toLowerCase();
        console.log('🌐 当前域名:', hostname);
        
        if (hostname.includes('lovescribe')) {
            return {
                css: 'themes/theme-lovescribe.css',
                title: 'LoveScribe',
                subtitle: 'Seal your love for the future.',
                placeholder: 'If the world ended tomorrow, what is the one memory of us that you would want to save from the fire?',
                buttonText: 'SEAL OUR VOW',
                gumroadLink: 'https://samzhu168.gumroad.com/l/sjuokv',
                certificateTitle: 'CERTIFICATE OF ETERNAL LOVE',
                backgroundImage: 'assets/lovescribe_bg.jpg' // 注意：去掉开头的 /
            };
        }
        
        if (hostname.includes('futurebloom')) {
            return {
                css: 'themes/theme-futurebloom.css',
                title: 'FutureBloom',
                subtitle: 'A letter to your child\'s 18th birthday.',
                placeholder: 'When they are old enough to understand, what is the courage you want them to find in your words?',
                buttonText: 'SEND TO THE FUTURE',
                gumroadLink: 'https://samzhu168.gumroad.com/l/htoqgu',
                certificateTitle: 'LETTER TO THE FUTURE',
                backgroundImage: 'assets/futurebloom_bg.jpg'
            };
        }
        
        return {
            css: 'themes/theme-echobox.css',
            title: 'The Echo Box',
            subtitle: 'Leave an echo, not just a memory.',
            placeholder: 'In the silence between your victories, what is the one truth you fear might die with you?',
            buttonText: 'IMPRINT INTO ETERNITY',
            gumroadLink: 'https://samzhu168.gumroad.com/l/fmrrxr',
            certificateTitle: 'CERTIFICATE OF LEGACY',
            backgroundImage: 'assets/echobox_bg.jpg'
        };
    }
    
    const currentTheme = getTheme();
    console.log('✅ 加载主题:', currentTheme.title);
    console.log('🖼️ 背景图路径:', currentTheme.backgroundImage);

    function applyTheme(theme) {
        // 注入 CSS
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

        // 设置文本内容
        document.title = theme.title;
        document.querySelector('header h1').innerText = theme.title;
        document.querySelector('header .subtitle').innerText = theme.subtitle;
        document.getElementById('legacy-text').placeholder = theme.placeholder;
        document.getElementById('imprint-button').innerText = theme.buttonText;
        
        const paymentButton = document.querySelector('.payment-button');
        if (paymentButton && theme.gumroadLink) {
            paymentButton.href = theme.gumroadLink;
        }
        
        // ✅ 设置背景图 - 关键修复
        if (theme.backgroundImage) {
            const fullPath = window.location.origin + '/' + theme.backgroundImage;
            console.log('🎨 尝试加载背景图:', fullPath);
            
            // 先清除所有现有背景设置
            document.body.style.backgroundImage = '';
            document.body.style.background = '';
            
            // 设置新背景
            document.body.style.backgroundImage = `url('${theme.backgroundImage}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.backgroundRepeat = 'no-repeat';
            
            // 验证是否生效
            setTimeout(() => {
                const computedBg = window.getComputedStyle(document.body).backgroundImage;
                console.log('✅ 实际应用的背景:', computedBg);
                
                if (computedBg === 'none') {
                    console.error('❌ 背景图未生效！可能原因：');
                    console.error('1. 图片文件不存在');
                    console.error('2. 路径错误');
                    console.error('3. CSS 被覆盖');
                    
                    // 临时用纯色代替
                    const fallbackColors = {
                        'LoveScribe': '#fdf6f4',
                        'FutureBloom': '#eef2f7',
                        'The Echo Box': '#0a0a0a'
                    };
                    document.body.style.backgroundColor = fallbackColors[theme.title];
                    console.log('🎨 已应用备用背景色');
                }
            }, 500);
        }
    }
    
    applyTheme(currentTheme);

    // ... 其余代码保持不变 ...
    // (这里省略了证书生成等其他功能的代码)
});