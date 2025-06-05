export class SearchStrategy {
  filter(boxers, criteria) {
    throw new Error('You must implement filter()');
  }
}

export class FilterByCountry extends SearchStrategy {
  filter(boxers, country) {
    return boxers.filter(b => b.country === country);
  }
}

export class FilterByWeight extends SearchStrategy {
  filter(boxers, weight) {
    return boxers.filter(b => b.weight === weight);
  }
}

export class CombinedFilter extends SearchStrategy {
  filter(boxers, { country, city, weight, gender }) {
    return boxers.filter(b =>
      (!country || country === 'europe' || b.country.toLowerCase() === country.toLowerCase()) &&
      (!city || city === 'any' || b.city.toLowerCase().replace(/\s+/g, '-') === city) &&
      (!weight || b.weight === weight) &&
      (!gender || b.gender === gender)
    );
  }
}

