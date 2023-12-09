const classNames = (...args: Array<string | Record<string, unknown>>): string => {
  const classesList: string[] = [];

  args.forEach((classOrObject) => {
    if (typeof classOrObject === 'string') {
      return classesList.push(classOrObject);
    }

    Object.entries(classOrObject).forEach(([key, condition]) => {
      if (condition) {
        classesList.push(key);
      }
    });
  });

  return classesList.join(' ');
};

export default classNames;
