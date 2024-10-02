export enum TRLSpecification {
  LEVEL_01 = 'Level 1 - Basic principals observed and reported',
  LEVEL_02 = 'Level 2 - Technology concept and/or application formulated',
  LEVEL_03 = 'Level 3 - Analytical and experimental critical function and/or characteristic proof of concept',
  LEVEL_04 = 'Level 4 - Component and/or breadboard validation in lab environment',
  LEVEL_05 = 'Level 5 - Component and/or breadboard validation in relevant environment',
  LEVEL_06 = 'Level 6 - System/subsystem model or prototype demo in relevant environment',
  LEVEL_07 = 'Level 7 - System prototype demonstration in an actual environment',
  LEVEL_08 = 'Level 8 - Actual system completed and qualified through test and demonstration',
  LEVEL_09 = 'Level 9 - Actual system proven through successful mission operations',
}

export enum MRLSpecification {
  LEVEL_01 = 'Level 1 - Basic manufacturing implications identified',
  LEVEL_02 = 'Level 2 - Manufacturing concepts identified',
  LEVEL_03 = 'Level 3 - Manufacturing proof of concept developed',
  LEVEL_04 = 'Level 4 - Capability to produce technology in a laboratory environment',
  LEVEL_05 = 'Level 5 - Capability to produce prototype components in a production relevant environment',
  LEVEL_06 = 'Level 6 - Capability to produce a prototype system/subsystem in a production relevant environment',
  LEVEL_07 = 'Level 7 - Capability to produce systems/subsystems or components in a production representative environment',
  LEVEL_08 = 'Level 8 - Pilot line capability demonstrated; ready to begin low rate production',
  LEVEL_09 = 'Level 9 - Low Rate Production demonstrated; capability in place to begin Full Rate Production',
  LEVEL_10 = 'Level 10 - Full Rate Production demonstrated and lean production practices in place',
}

export enum InformationType {
  TECHNICAL_SPECIFICATIONS = 'Technical Specifications',
  CUSTOMIZATION_OPTIONS = 'Customization Options',
  INTEGRATIONS = 'Integrations',
  SUPPORT_AND_MAINTENANCE = 'Support & Maintenance',
  TRAINING = 'Training',
  PRODUCT_ROADMAP = 'Product Roadmap',
  REFERENCES_AND_TESTIMONIALS = 'References & Testimonials',
  OTHER = 'Other',
}
