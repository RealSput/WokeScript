const checkPronouns = (v, pronoun) => {
  if (!v?.p1 || !v?.p2 || !v?.name)
    throw new Error('Variable does not have pronouns!');
  if (v.p1 !== pronoun && v.p2 !== pronoun)
    throw new Error(
      `Variable "${v.name}" misgendered! (pronouns were ${v.p1}/${v.p2}, used '${pronoun}' pronoun)`
    );
  return v.value;
};
let he = (v) => checkPronouns(v, 'he'),
  him = (v) => checkPronouns(v, 'him'),
  she = (v) => checkPronouns(v, 'she'),
  her = (v) => checkPronouns(v, 'her'),
  they = (v) => checkPronouns(v, 'they'),
  them = (v) => checkPronouns(v, 'them'),
  pronouns = (v) => `${v.p1}/${v.p2}`;
