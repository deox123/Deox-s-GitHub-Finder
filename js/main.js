$(document).ready(function(){
  $('#search').on('keyup', function(e){
    let username = e.target.value;
    console.log(username);

    // Makde ajax request
    $.ajax({
      url:"https://api.github.com/users/" + username,
      data:{
        client_id:"24ce5a1647a90326e94c",
        client_sicret:"a694e606c4db36c8a193cd459e2accb058d0adb4"
      }
    }).done(function(user){
      $.ajax({
        url:"https://api.github.com/users/" + username + "/repos",
        data:{
          client_id:"24ce5a1647a90326e94c",
          client_sicret:"a694e606c4db36c8a193cd459e2accb058d0adb4",
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo) {
          console.log(repo);

          $('#repos').append(`
            <hr>
            <div class="well well-sm">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-pill badge-info">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-pill badge-secondary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-pill badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a target="_blank" class="btn btn-primary btn-block" href="${repo.html_url}">View</a>
                </div>
              </div>
            </div>
          </div>
          <br>
          `);
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="avatar thumbnail" src="${user.avatar_url}" >
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9 profile-badge">
                <span class="badge badge-pill badge-info">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-pill badge-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-pill badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-pill badge-danger">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
              </div>
            </div>

          </div>
        </div> <!-- Profile info -->
        <br><br>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"> </div>

      `)
    });
  });
});
