import React, { useEffect, useState } from 'react'

const ProfileGithub = ({username}) => {
    const [data,setData] =useState({
        clientId: '4e65053dbd4846b4d3df',
        clientSecret: '3effddda86fb8a143f148cb0287f8e1609d6e408',
        count: 5,
        sort: 'created: asc',
        repos:[]
    })
    useEffect(()=>{
        fetch(`https://api.github.com/users/${username}/repos?per_page=${data.count}&sort=${data.sort}&client_id=${data.clientId}&client_secret=${data.clientSecret}`)
            .then(res=> res.json())
            .then(data=>{
                setData({
                    ...data,
                    repos: data
                })
            })
            .catch(err=> console.log(err))
    }, []);

    const repoitems= data.repos.map(repo =>(
        <div className="repo bg-white p-1 my-1" key={repo.id}>
            <div>
              <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
                {repo.description}
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
      </div>
    ))
    return (
        <>
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {repoitems}
     </div>
          
          
      </>
        
    )
}

export default ProfileGithub



