function getElapsedTime(text) {
    var timeStr = (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
    text.setText("Time: " + timeStr);
}