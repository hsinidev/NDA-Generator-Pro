import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import NDAGenerator from './components/NDAGenerator';
import { SeoArticle, jsonLdSchema } from './utils/SeoArticle';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const navLinks = [
    { name: 'About', content: 'This tool was created to simplify the process of generating standard Non-Disclosure Agreements. It is for informational purposes only.' },
    { name: 'Contact', content: 'For inquiries, please reach out to hsini.web@gmail.com.' },
    { name: 'Guide', content: 'To use the generator, select an NDA type, fill in all the required fields with the relevant party information, dates, and scope. Then, click "Generate NDA Text". You can then copy the text to your clipboard or simulate a .DOCX download.' },
    { name: 'Privacy Policy', content: 'We do not collect or store any personal information entered into the NDA generator. All processing happens in your browser.' },
    { name: 'Terms of Service', content: 'The generated documents are templates and do not constitute legal advice. You should consult with a legal professional for any serious matters.' },
    { name: 'DMCA', content: 'If you have any copyright concerns, please contact us at hsini.web@gmail.com with the necessary information.' },
  ];

  const openModal = (name: string, content: string) => {
    setModalContent({ title: name, content: <p>{content}</p> });
  };
  
  const getGuideContent = () => {
      const guide = navLinks.find(link => link.name === 'Guide');
      if (guide) {
          openModal(guide.name, guide.content);
      }
  };

  useEffect(() => {
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLdSchema);
    document.head.appendChild(script);

    return () => {
      const scriptInHead = document.querySelector('script[type="application/ld+json"]');
      if (scriptInHead) {
        document.head.removeChild(scriptInHead);
      }
    };
  }, []);

  return (
    <>
      <Layout navLinks={navLinks} onNavLinkClick={openModal}>
        <NDAGenerator onGuideClick={getGuideContent} />
        <SeoArticle />
      </Layout>
      {modalContent && (
        <Modal title={modalContent.title} onClose={() => setModalContent(null)}>
          {modalContent.content}
        </Modal>
      )}
    </>
  );
};

export default App;