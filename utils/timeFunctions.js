import moment from 'moment';
export const timeAgo = (createdDate) => {
  return moment(new Date(createdDate * 1000)).fromNow();
};
