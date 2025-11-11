
import type { NDAFormData } from '../types';

export const generateNDAText = (data: NDAFormData): string => {
    const { type, disclosingParty, receivingParty, effectiveDate, duration, confidentialInfoScope } = data;

    const oneWayHeader = `This Non-Disclosure Agreement (the "Agreement") is entered into as of ${effectiveDate} (the "Effective Date"), by and between ${disclosingParty} ("Disclosing Party"), and ${receivingParty} ("Receiving Party").`;
    
    const mutualHeader = `This Mutual Non-Disclosure Agreement (the "Agreement") is entered into as of ${effectiveDate} (the "Effective Date"), by and between ${disclosingParty} ("Party A"), and ${receivingParty} ("Party B"). Hereinafter, Party A and Party B may be referred to individually as a "Party" and collectively as the "Parties". In this Agreement, the Party disclosing information is the "Disclosing Party" and the Party receiving information is the "Receiving Party".`;

    const template = `
${type === 'one-way' ? oneWayHeader : mutualHeader}

1.  **Purpose.** The Parties wish to engage in discussions concerning a potential business relationship (the "Purpose"). In connection with the Purpose, each Party may disclose certain confidential information to the other.

2.  **Definition of Confidential Information.** "Confidential Information" means any and all non-public information, whether disclosed in writing, orally, or by any other means, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure. Confidential Information includes, but is not limited to, the following:
    ${confidentialInfoScope}

3.  **Obligations.** The Receiving Party agrees:
    (a) to hold the Confidential Information in strict confidence and to take all reasonable precautions to protect such Confidential Information.
    (b) not to disclose any Confidential Information to any third party, except as otherwise expressly permitted in this Agreement.
    (c) not to use any Confidential Information for any purpose whatsoever except for the Purpose.

4.  **Exclusions.** The obligations under Section 3 do not apply to information that the Receiving Party can demonstrate:
    (a) was publicly known and made generally available in the public domain prior to the time of disclosure by the Disclosing Party;
    (b) becomes publicly known and made generally available after disclosure by the Disclosing Party to the Receiving Party through no action or inaction of the Receiving Party;
    (c) is required by law to be disclosed by the Receiving Party, provided that the Receiving Party gives the Disclosing Party prompt written notice of such requirement prior to such disclosure.

5.  **Term.** The obligations of confidentiality contained in this Agreement shall survive for a period of ${duration} from the Effective Date.

6.  **Return of Materials.** Upon the request of the Disclosing Party, the Receiving Party shall promptly return all documents and other tangible materials representing the Disclosing Party's Confidential Information and all copies thereof.

7.  **No License.** Nothing in this Agreement is intended to grant any rights to the Receiving Party under any patent, copyright, or other intellectual property right of the Disclosing Party, nor shall this Agreement grant the Receiving Party any rights in or to the Confidential Information except as expressly set forth herein.

8.  **Governing Law.** This Agreement shall be governed by and construed in accordance with the laws of the State of [INSERT STATE/JURISDICTION], without regard to its conflict of laws principles.

9.  **Miscellaneous.** This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, understandings, and communications, both written and oral. This Agreement may not be amended except in a writing signed by both Parties.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.

DISCLOSING PARTY:

By: _________________________
Name: ${disclosingParty}
Title: _________________________


RECEIVING PARTY:

By: _________________________
Name: ${receivingParty}
Title: _________________________

---
Note: If this is a Mutual NDA, both parties act as Disclosing and Receiving Parties. The signature block remains for clarity of the initiating parties.
`;

    return template.trim();
};
