<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Update Hub</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

</head>
<body>
    <div class="container">
        <h1>Course Update Hub</h1>
        <div class = "new-post-container">
          <h2>Create New Post</h2>
             <input type="text" id="post-author" placeholder="Your Name">
            <select id="post-category">
                <option value="announcement">Announcement</option>
                <option value="assignment">Assignment</option>
                <option value="lecture">Lecture</option>
                <option value="event">Event</option>
            </select>
          <div id="editor" class ="editor"></div>
            <input type="file" id="post-file" >
         <input type="datetime-local" id="post-date" >
            <button id="create-post-btn">Create Post</button>
           </div>
      <div class="filter-container">
        <h2>Filter Posts</h2>
        <select id="filter-category">
          <option value="all">All Categories</option>
          <option value="announcement">Announcement</option>
          <option value="assignment">Assignment</option>
          <option value="lecture">Lecture</option>
          <option value="event">Event</option>
        </select>
            <input type = "text" id ="search-input" placeholder ="Search Posts..." >
         </div>

        <div id="posts-container">
         </div>
    </div>
 <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script src="script.js"></script>
</body>
</html>
