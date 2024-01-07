let bearerToken = "Bearer ";
let tokenset = false;

export function getBearerToken() {
  return bearerToken;
}

export function setBearerToken(newToken) {
  if (tokenset === false) {
    tokenset = true;
    bearerToken = bearerToken + newToken;
  }
}

export const UserMap = new Map();

UserMap.set("65392efd65bb52b90c8fac67", {
  name: "partik",
  img: "https://scontent.fbbi4-1.fna.fbcdn.net/v/t39.30808-6/384470156_621637833475535_5680275089051804810_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hAceM4VMwKMAX_mV2pN&_nc_ht=scontent.fbbi4-1.fna&oh=00_AfA0t1N7_IgPHFr-wkBDtnRylfpFZsrEKwOSPXZ-QcOpfA&oe=655A21FB",
});
UserMap.set("65032b7628babc1110191f62", {
  name: "rahul",
  img: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
});
UserMap.set("650e894081acb6d2f0d1a6c7", {
  name: "manik",
  img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/366.jpg",
});
UserMap.set("6509655898e8a1dfeaf886d2", {
  name: "nil",
  img: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
});
UserMap.set("650e894081acb6d2f0d1a6c7", {
  name: "thomas",
  img: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
});
UserMap.set("6512bba4c3d7db3677f597c2", {
  name: "suyash",
  img: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
});
UserMap.set("65296bb6a1ea4d2294755723", {
  name: "Nayar",
  img: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
});
UserMap.set("65296bb6a1ea4d2294755723", {
  name: "Anku",
  img: "http://t1.gstatic.com/images?q=tbn:ANd9GcQO9uxMB1FX2AzaVz_S2H42Gjnm-g925Q1cKF8RClf_P54zoW_DSmtrqcyuyUoqrzNp82Hy",
});
UserMap.set("65392efd65bb52b90c8fac67", {
  name: "Sejal",
  img: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
});
UserMap.set("65392efd65bb52b90c8fac67", {
  name: "Ankita",
  img: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
});
UserMap.set("65032b7628babc1110191f62",{"name":"Smith","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/4.jpg"});
UserMap.set("650ae52798e8a1dfeaf8e444",{"name":"David","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/462.jpg"});
UserMap.set("650e894081acb6d2f0d1a6c7",{"name":"Ken","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/46.jpg"});
UserMap.set("65114162fc56d3d1ff9909c9",{"name":"Stark","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1121.jpg"});
UserMap.set("6509655898e8a1dfeaf886d2",{"name":"Jems","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1131.jpg"});
UserMap.set("650293b042fb9997dea65827",{"name":"Robin","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1108.jpg"});
UserMap.set("65310c7fc14d0da6d7d2a98a",{"name":"Alex","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/210.jpg"});
UserMap.set("6512bba4c3d7db3677f597c2",{"name":"Leo","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/220.jpg"});
UserMap.set("6509404fab4180c9abec2b94",{"name":"Bella","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/357.jpg"});
UserMap.set("65296bb6a1ea4d2294755723",{"name":"Suyash","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/540.jpg"});
UserMap.set("653cdd6e8e9b5f7b80e10263",{"name":"herry","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/997.jpg"});
UserMap.set("652e8f8c64d7830e72354ff6",{"name":"Arun","photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1017.jpg"});