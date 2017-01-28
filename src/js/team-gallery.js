var members_r2 = [
    {
      'src': '',
      'name': 'Ayesha Patel'
    },
    {
      'src': '',
      'name': 'Balazs Szegletes'
    },
    {
      'src': '',
      'name': 'Eldar Slobodyan'
    },
    {
      'src': '',
      'name': 'Emily Leng'
    },
    {
      'src': '',
      'name': 'Gargi Ratnaparkhi'
    },
    {
      'src': '',
      'name': 'Harley Dietz'
    },
    {
      'src': '',
      'name': 'James Chen'
    },
    {
      'src': '',
      'name': 'Jason Miao'
    },
    {
      'src': '',
      'name': 'Jeffery Lee'
    },
    {
      'src': '',
      'name': 'Kevin Jiang'
    },
    {
      'src': '',
      'name': 'Manish Patel'
    },
    {
      'src': '',
      'name': 'Matthew Filipek'
    },
    {
      'src': '',
      'name': 'Monika Bandi'
    },
    {
      'src': '',
      'name': 'Oscar Pacheco'
    },
    {
      'src': '',
      'name': 'Sang Man Lee'
    },
    {
      'src': '',
      'name': 'Scott Wu'
    },
    {
      'src': '',
      'name': 'Shanee Lu'
    },
    {
      'src': '',
      'name': 'Steve Slaughter'
    },
    {
      'src': '',
      'name': 'Syed Tahmid Mahbub'
    },
    {
      'src': '',
      'name': 'Vaidehi Garg'
    },
    {
      'src': '',
      'name': 'Wyatt Eberspacher'
    }
  ],
  members_modbot = [
    {
      'src': '',
      'name': 'Celine Choo'
    },
    {
      'src': '',
      'name': 'Devang Dave'
    },
    {
      'src': '',
      'name': 'Junpeng Wang'
    },
    {
      'src': '',
      'name': 'Kristopher Yoo'
    },
    {
      'src': '',
      'name': 'Lydia Johnson'
    },
    {
      'src': '',
      'name': 'Matthew Li'
    },
    {
      'src': '',
      'name': 'Matthew Zhang'
    },
    {
      'src': '',
      'name': 'Mustafa Khalid Mian'
    },
    {
      'src': '',
      'name': 'Peter Slater'
    },
    {
      'src': '',
      'name': 'Priyanka Kompella'
    },
    {
      'src': '',
      'name': 'Zihao Lu'
    }
  ],
  members_minibot = [
    {
      'src': '',
      'name': 'Alan Yan'
    },
    {
      'src': '',
      'name': 'Alex Rucker'
    },
    {
      'src': '',
      'name': 'Andrew Dawd'
    },
    {
      'src': '',
      'name': 'Ashley Yang'
    },
    {
      'src': '',
      'name': 'Christopher Wolfrom'
    },
    {
      'src': '',
      'name': 'Gregory Pon'
    },
    {
      'src': '',
      'name': 'Han Li'
    },
    {
      'src': '',
      'name': 'Lauren Hsu'
    },
    {
      'src': '',
      'name': 'Leo Tang'
    },
    {
      'src': '',
      'name': 'Matt O\'Conner'
    },
    {
      'src': '',
      'name': 'Matthew Bell'
    },
    {
      'src': '',
      'name': 'Matthew Filipek'
    },
    {
      'src': '',
      'name': 'Megan Messick'
    },
    {
      'src': '',
      'name': 'Patrick Griffin'
    },
    {
      'src': '',
      'name': 'Ronald Forster'
    },
    {
      'src': '',
      'name': 'Sanush Kehelella'
    },
    {
      'src': '',
      'name': 'Trevor Edwards'
    }
  ],
  members_business = [
    {
      'src': '',
      'name': 'Joe Wetzel'
    },
    {
      'src': '',
      'name': 'Kevin Ortiz'
    },
    {
      'src': '',
      'name': 'Maria Jose Alanis'
    }
  ],
  members_webdev = [
    {
      'src': '',
      'name': 'Ariel Gleitman'
    },
    {
      'src': '',
      'name': 'Victoria Beall'
    }
  ];

function expandListener(selector) {
  var subteam = document.querySelector(selector),
    arrow = document.querySelector(selector + ' > span');

  arrow.addEventListener('click', function() {
    subteam.classList.toggle('closed');
  });
}

/* Create an 'image-block' element:
 *
 * <div class="image-block">
 *   <span class="image-span">
 *    <h1 class="image-caption">name</h1>
 *     <p class="image-caption">subteam</p>
 *   </span>
 *   <div class="image">
 *     <img alt="name-subteam" src="#">
 *   </div>
 * </div>
 *
 */
function addMembersPhotos(members, subteam) {
  var team = document.querySelector('.team .' + subteam + ' .image-gallery'),
    image_block, image, img, span, h1, p;

  for (var i = 0; i < members.length; i++) {
    image_block = document.createElement('div');
    image_block.classList.add('image-block');

    image = document.createElement('div');

    if (members[i].src == '') {
      img = document.createElement('p');
      img.innerHTML = members[i].name;
    } else {
      img = document.createElement('img');
      img.alt = members[i].name + '-' + subteam;
      img.src = 'images/' + members[i].src;

      // add span hover
      span = document.createElement('span');
      span.classList.add('image-span');
      h1 = document.createElement('h1');
      h1.classList.add('image-caption');
      h1.innerHTML = members[i].name;
      p = document.createElement('p');
      p.classList.add('image-caption');
      p.innerHTML = subteam;
      span.appendChild(h1);
      span.appendChild(p);
      image_block.appendChild(span);
    }
    img.classList.add('image');

    image.appendChild(img);
    image_block.appendChild(image);
    team.appendChild(image_block);
  }

  expandListener('.team .' + subteam + ' .subteam');
}

addMembersPhotos(members_r2, 'R2-D2');
addMembersPhotos(members_modbot, 'ModBot');
addMembersPhotos(members_minibot, 'Minibot');
addMembersPhotos(members_business, 'Business');
addMembersPhotos(members_webdev, 'Web-Dev');
