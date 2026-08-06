(() => {
  const classInputs = [...document.querySelectorAll('input[name="rule-class"]')];
  const ageInputs = [...document.querySelectorAll('input[name="rule-age"]')];
  const title = document.querySelector('#rule-result-title');
  const list = document.querySelector('#rule-result-list');
  const printButton = document.querySelector('#print-rule-check');

  if (!classInputs.length || !ageInputs.length || !title || !list) return;

  const classes = {
    1: {
      name: 'Class I quad',
      requirements: [
        'Display a valid Oregon ATV operating permit, or a currently accepted reciprocal permit.',
        'The operator must possess an ATV Safety Education Card.',
        'Use a red or orange sand flag at least 8 × 12 inches, displayed nine feet above the ground.',
        'Carry the current riding map and stay inside designated motorized areas.'
      ]
    },
    2: {
      name: 'Class II 4×4 or sand rail',
      requirements: [
        'Display a valid Oregon ATV operating permit when operating off road.',
        'The operator needs valid state-issued driving privileges.',
        'Carry required liability insurance and class-specific equipment.',
        'Seats and securely mounted seat belts are required for every occupant.',
        'Use a red or orange sand flag at least 8 × 12 inches, displayed nine feet above the ground.'
      ]
    },
    3: {
      name: 'Class III dirt bike',
      requirements: [
        'Display a valid Oregon ATV operating permit, or a currently accepted reciprocal permit.',
        'The operator must possess an ATV Safety Education Card.',
        'The minimum operator age is seven.',
        'Use a red or orange sand flag at least 8 × 12 inches, displayed nine feet above the ground.',
        'Carry the current riding map and stay inside designated motorized areas.'
      ]
    },
    4: {
      name: 'Class IV side-by-side',
      requirements: [
        'Display a valid Oregon ATV operating permit, or a currently accepted reciprocal permit.',
        'Use the manufacturer-provided seats and restraints for every occupant.',
        'Use a red or orange sand flag at least 8 × 12 inches, displayed nine feet above the ground.',
        'Carry the current riding map and stay inside designated motorized areas.'
      ]
    }
  };

  const ageNames = {
    adult: 'Adult',
    teen: 'Age 16–17 operator',
    youth: 'Youth operator under 16'
  };

  function ageRequirements(vehicleClass, age) {
    if (age === 'adult') {
      return vehicleClass === '4' ? ['The operator needs valid state-issued driving privileges.'] : [];
    }
    if (age === 'teen') {
      return [
        'A properly fastened DOT-approved helmet is required.',
        vehicleClass === '2' || vehicleClass === '4'
          ? 'Confirm valid driving privileges and use the required seat and restraint.'
          : 'Carry the required Safety Education Card while riding.'
      ];
    }

    const youth = [
      'Complete the online course and required hands-on training or evaluation.',
      'Ride under qualified adult supervision that can provide immediate direction and assistance.',
      'Wear a properly fastened DOT-approved helmet.',
      'Use an age-appropriate machine and meet all rider-fit or manufacturer age requirements.'
    ];
    if (vehicleClass === '4') {
      youth.push('The youth needs an ATV Safety Education Card unless operating under a valid instruction permit; verify the current Class IV provision.');
      youth.push('Use the required seat belt and any applicable child restraint.');
    }
    return youth;
  }

  function render() {
    const vehicleClass = classInputs.find(input => input.checked)?.value || '1';
    const age = ageInputs.find(input => input.checked)?.value || 'adult';
    const selected = classes[vehicleClass];
    title.textContent = `${ageNames[age]} riding a ${selected.name}`;

    const items = [
      ...selected.requirements,
      ...ageRequirements(vehicleClass, age),
      'Before unloading, verify current Forest Service alerts, posted closures, the 93 dB sound limit, spark-arrester requirements, and required lighting.'
    ];

    list.innerHTML = [...new Set(items)].map(item => `<li>${item}</li>`).join('');
  }

  [...classInputs, ...ageInputs].forEach(input => input.addEventListener('change', render));
  printButton?.addEventListener('click', () => {
    document.body.classList.add('rule-print-mode');
    window.print();
    window.setTimeout(() => document.body.classList.remove('rule-print-mode'), 500);
  });

  window.addEventListener('afterprint', () => document.body.classList.remove('rule-print-mode'));
  render();
})();
