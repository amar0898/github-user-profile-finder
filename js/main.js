$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    // Make request to Github
    $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
          client_id:'7f8dc68e8f3e87f4ed4a',
          client_secret:'a7f7c4c276757e9ba27ad494db207ce3eaaebcc6'
        }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'7f8dc68e8f3e87f4ed4a',
          client_secret:'a7f7c4c276757e9ba27ad494db207ce3eaaebcc6',
          sort: 'created: asc',
          per_page: 8
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well mt-4 pt-4 pb-3">
              <div class="row mt-2">
                <div class="col-md-7">
                  <h4><strong>${repo.name}</strong>:</h4> ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-danger">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-outline-success">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="card border-success mb-3" style="max-width: 100rem;">
          <div class="card-header"><h3>${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-success btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-danger">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h2 class="page-header"><b>Latest Repository :</b></h2>
        <div id="repos"></div>
        `);
    });
  });
});
