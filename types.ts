
export interface NDAFormData {
  type: 'one-way' | 'mutual';
  disclosingParty: string;
  receivingParty: string;
  effectiveDate: string;
  duration: string;
  confidentialInfoScope: string;
}
