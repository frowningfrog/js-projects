const quizType = localStorage.getItem('quizType');

const script = document.createElement('script');

if(quizType === 'monster') {
    script.src = 'mquiz.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);
}
if(quizType === 'class') {
    script.src = 'cquiz.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);
}