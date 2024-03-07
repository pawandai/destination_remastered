import moment from 'moment';

export const timeAgo = (createdDate) => {
  return moment(new Date(createdDate * 1000)).fromNow();
};

export const commentTimeAgo = (createdDate) => {
  const now = moment();
  const postDate = moment.unix(createdDate);

  // Calculate the difference in seconds
  const diffSeconds = now.diff(postDate, 'seconds');

  // Based on the difference, customize the output format
  if (diffSeconds < 60) {
    return `${diffSeconds} s`;
  } else if (diffSeconds < 3600) {
    return `${Math.floor(diffSeconds / 60)} min`;
  } else if (diffSeconds < 86400) {
    return `${Math.floor(diffSeconds / 3600)} hr`;
  } else if (diffSeconds < 2592000) {
    return `${Math.floor(diffSeconds / 86400)} d`;
  } else if (diffSeconds < 31536000) {
    return `${Math.floor(diffSeconds / 2592000)} mo`;
  } else {
    return `${Math.floor(diffSeconds / 31536000)} yr`;
  }
};
